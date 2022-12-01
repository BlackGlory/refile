import { isAdmin } from './admin.js'
import * as Blacklist from './blacklist.js'
import * as Whitelist from './whitelist.js'
import { TBAC } from './token-based-access-control/index.js'
import * as Refile from './refile.js'

export const Core: ICore = {
  isAdmin
, Refile
, Blacklist
, Whitelist
, TBAC
}
