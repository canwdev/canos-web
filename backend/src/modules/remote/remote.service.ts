import {Injectable} from '@nestjs/common'
import * as Client from 'ssh2'

interface ISSHConfig {
  host: string
  port: number
  username: string
  password?: string
  privateKey?: string
  passphrase?: string
}

@Injectable()
export class RemoteService {
  private connection: Client.Client

  async connectSSH(config: ISSHConfig) {
    return new Promise((resolve, reject) => {
      const conn = new Client.Client()

      conn
        .on('ready', () => {
          this.connection = conn
          resolve({success: true})
        })
        .on('error', (err) => {
          reject(err)
        })
        .connect({
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          privateKey: config.privateKey,
          passphrase: config.passphrase,
        })
    })
  }

  async executeCommand(command: string) {
    return new Promise((resolve, reject) => {
      const conn = this.connection
      conn.exec(command, (err, stream) => {
        if (err) reject(err)

        let output = ''
        stream
          .on('close', (code, signal) => {
            resolve(output)
          })
          .on('data', (data) => {
            output += data.toString()
          })
          .stderr.on('data', (data) => {
            output += data.toString()
          })
      })
    })
  }

  closeConnection(conn: Client.Client) {
    conn.end()
  }
}
