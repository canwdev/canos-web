import {Sequelize} from 'sequelize'
import * as path from 'path'
import {configBasePath} from '@/enum'
import * as fs from 'fs'
const dbPath = path.join(configBasePath, 'database.db')

if (fs.existsSync(dbPath)) {
  fs.copyFileSync(dbPath, path.join(configBasePath, 'database.db.bak'))
}

export const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  storage: dbPath,
  // disable logging; default: console.log
  logging: false,
})
