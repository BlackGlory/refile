import { isAdmin } from './admin.js'
import * as Blacklist from './blacklist.js'
import * as Whitelist from './whitelist.js'
import { TBAC } from './token-based-access-control/index.js'
import * as Refile from './refile.js'
import { IAPI } from './contract.js'

export const api: IAPI = {
  isAdmin
, Refile
, Blacklist
, Whitelist
, TBAC
}
