import { isAdmin } from './admin.js'
import * as Refile from './refile.js'
import { IAPI } from './contract.js'

export const api: IAPI = {
  isAdmin
, Refile
}
