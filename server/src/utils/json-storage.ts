import * as fs from 'fs'
import * as Path from 'path'

export class JsonStorage {
  private filePath: string
  private data: any
  private defaultData: any

  constructor(filePath: string, defaultData = {}) {
    this.filePath = filePath
    this.defaultData = JSON.parse(JSON.stringify(defaultData))
    this.data = this.readData()
    // console.log(this.data)
  }

  readData() {
    try {
      const rawData: any = fs.readFileSync(this.filePath)
      return JSON.parse(rawData)
    } catch (error) {
      // Return defaultData || null if file doesn't exist or has invalid JSON
      return this.defaultData || null
    }
  }

  writeData() {
    try {
      const jsonData = JSON.stringify(this.data, null, 2)
      fs.writeFileSync(this.filePath, jsonData)
    } catch (error) {
      console.error('Error writing data:', error)
    }
  }

  getData() {
    return this.data
  }

  setData(data: any) {
    this.data = data
    this.writeData()
  }

  getItem(key, force = false) {
    if (force) {
      this.data = this.readData() || {}
    }
    return this.data[key] || null
  }

  setItem(key, value) {
    this.data[key] = value
    this.writeData()
  }

  removeItem(key) {
    delete this.data[key]
    this.writeData()
  }

  clear() {
    this.data = {}
    this.writeData()
  }

  backup() {
    if (!fs.existsSync(this.filePath)) {
      throw new Error('file not exist!' + this.filePath)
    }
    try {
      const filePath = this.filePath

      // 获取文件名
      const fileName = Path.basename(filePath)

      // 获取文件扩展名
      const fileExt = Path.extname(filePath)

      // 生成带时间戳的新文件名
      const newFileName = `${fileName}_${Date.now()}${fileExt}`

      // 构建新文件的绝对路径
      const newFilePath = Path.join(Path.dirname(filePath), newFileName)

      // 复制文件
      fs.copyFileSync(filePath, newFilePath)
    } catch (error) {
      console.error('Error writing data:', error)
    }
  }
}
