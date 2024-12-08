import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import {Server, Socket} from 'socket.io'
import {spawn, ChildProcessWithoutNullStreams} from 'child_process'
import * as os from 'os'
import {isDev} from '@/enum'
import {serverLogger} from '@/utils/server-log'
import {UsersService} from '@/modules/users/users.service'
import {JwtService} from '@nestjs/jwt'

@WebSocketGateway({
  cors: isDev
    ? {
        origin: '*',
      }
    : undefined,
  namespace: 'terminal-ws',
})
export class RemoteGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private terminals: Map<string, ChildProcessWithoutNullStreams> = new Map()

  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    // 方式1：jwt 认证，此为控制端管理后台
    const token = client.handshake.headers['authorization']
    if (token) {
      try {
        const jwtData = this.jwtService.verify(token.split(' ')[1]) // Bearer token
        serverLogger.info('[S] user jwtData:', jwtData)
        // 检查用户是否可用
        const user = await this.usersService.findUser({id: jwtData.sub})
        if (!user) {
          throw new Error('User does not exist')
        }
        if (user.disabled) {
          throw new Error('User disabled')
        }
        // 还可以检查用户组，由于登录用于都可管理，此处忽略。

        serverLogger.info(`[remote] Client connected: ${client.id}`)
      } catch (error) {
        client.disconnect()
        serverLogger.error('[remote] Authorization Failed:', error.message)
      }
      return
    }
    client.disconnect()
    serverLogger.error('[remote] Authorization Failed: no handshake from client')
  }

  handleDisconnect(client: Socket) {
    this.closeTerminal(client.id)
  }

  @SubscribeMessage('start-terminal')
  startTerminal(client: Socket) {
    let shell: string
    let args: string[] = []

    switch (os.platform()) {
      case 'win32':
        // 使用 powershell 并保持会话
        shell = 'powershell.exe'
        args = [
          '-NoProfile', // 不加载配置文件
          '-NoExit', // 保持窗口打开
          '-Command', // 执行命令
          'prompt "PS $PWD>"', // 自定义提示符
        ]
        break
      default: // linux, darwin
        shell = '/bin/bash'
        args = ['-i'] // 交互式 shell
        break
    }

    try {
      const terminal = spawn(shell, args, {
        env: {...process.env},
        shell: true,
      })
      serverLogger.info('[startTerminal]', shell, args)

      this.terminals.set(client.id, terminal)

      // 发送初始欢迎消息
      // client.emit('stdout', `Welcome to Interactive Terminal\n`)

      terminal.stdout.on('data', (data) => {
        const out = data.toString()
        serverLogger.trace(`[remote] stdout: ${out}`)
        client.emit('stdout', out)
      })

      terminal.stderr.on('data', (data) => {
        const out = data.toString()
        serverLogger.error(`[remote] stderr: ${out}`)
        client.emit('stderr', out)
      })

      terminal.on('close', (code) => {
        serverLogger.info(`[remote] close: ${code}`)
        client.emit('terminal-close', code)
        this.terminals.delete(client.id)
      })
    } catch (error) {
      serverLogger.error('[remote] Failed to start terminal:', error)
      client.emit('stderr', `Failed to start terminal: ${error.message}`)
    }
  }

  @SubscribeMessage('stdin')
  handleTerminalInput(client: Socket, input: string) {
    const terminal = this.terminals.get(client.id)
    serverLogger.trace(`[handleTerminalInput] ${client.id}`, input)
    if (terminal) {
      terminal.stdin.write(input)
    }
  }

  closeTerminal(clientId: string) {
    const terminal = this.terminals.get(clientId)
    if (terminal) {
      terminal.kill()
      this.terminals.delete(clientId)
    }
  }
}
