import { isAdmin } from './admin'
import { stats } from './stats'
import * as Blacklist from './blacklist'
import * as Whitelist from './whitelist'
import { TBAC } from './token-based-access-control'
import * as Refile from './refile'

export const Core: ICore = {
  isAdmin
, stats
, Refile
, Blacklist
, Whitelist
, TBAC
}
