import {dataBasePath} from '@/enum'
import * as Path from 'path'
import {JsonStorage} from '@/utils/json-storage'

// IServerSettings
export const serverSettingsStore = new JsonStorage(
  Path.join(dataBasePath, 'server-settings.json'),
  {users: []},
)
