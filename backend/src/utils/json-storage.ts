import * as fs from 'fs-extra'
import * as Path from 'path'
import {deepMerge, isKeyEqual} from './json-storage-utils'

interface IOptions {
  autoMigrate?: boolean
}

export class JsonStorage {
  private filePath: string
  private data: any
  private defaultData: any

  constructor(filePath: string, defaultData = {}, options: IOptions = {autoMigrate: true}) {
    this.filePath = filePath
    this.defaultData = JSON.parse(JSON.stringify(defaultData))
    let rawData = this.readData()

    if (options.autoMigrate) {
      // 自动更新原始数据
      if (rawData && defaultData && !isKeyEqual(rawData, defaultData)) {
        rawData = deepMerge(defaultData, rawData)
        // console.log('自动更新原始数据', rawData)
        this.writeData(rawData)
      } else if (!rawData && defaultData) {
        this.writeData(defaultData)
        rawData = this.readData()
      }
    }

    this.data = rawData
    // console.log(this.data)
  }

  readData() {
    try {
      const rawData: any = fs.readFileSync(this.filePath)
      return JSON.parse(rawData)
    } catch (error) {
      // Return defaultData || null if file doesn't exist or has invalid JSON
      return null
    }
  }

  writeData(data = this.data) {
    try {
      const jsonData = JSON.stringify(data, null, 2)
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
