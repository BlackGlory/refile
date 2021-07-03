import { ValueGetter } from 'value-getter'
import { isNumber } from '@blackglory/types'
import { Getter } from 'justypes'
import { assert } from '@blackglory/errors'
import { getCache } from '@env/cache'
import { path as appRoot } from 'app-root-path'
import * as path from 'path'

export enum ListBasedAccessControl {
  Disable
, Whitelist
, Blacklist
}

export enum NodeEnv {
  Test
, Development
, Production
}

export const NODE_ENV: Getter<NodeEnv | undefined> =
  env('NODE_ENV')
    .convert(val => {
      switch (val) {
        case 'test': return NodeEnv.Test
        case 'development': return NodeEnv.Development
        case 'production': return NodeEnv.Production
      }
    })
    .memoize(getCache)
    .get()

export const CI: Getter<boolean> =
  env('CI')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const DATA: Getter<string> =
  env('REFILE_DATA')
    .default(path.join(appRoot, 'data'))
    .memoize(getCache)
    .get()

export const HOST: Getter<string> =
  env('REFILE_HOST')
    .default('localhost')
    .memoize(getCache)
    .get()

export const PORT: Getter<number> =
  env('REFILE_PORT')
    .convert(toInteger)
    .default(8080)
    .memoize(getCache)
    .get()

export const HTTP2: Getter<boolean> =
  env('REFILE_HTTP2')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const PAYLOAD_LIMIT: Getter<number> =
  env('REFILE_PAYLOAD_LIMIT')
    .convert(toInteger)
    .default(1048576)
    .assert(shouldBePositive)
    .memoize(getCache)
    .get()

export const ADMIN_PASSWORD: Getter<string | undefined> =
  env('REFILE_ADMIN_PASSWORD')
    .memoize(getCache)
    .get()

export const LIST_BASED_ACCESS_CONTROL: Getter<ListBasedAccessControl> =
  env('REFILE_LIST_BASED_ACCESS_CONTROL')
    .convert(val => {
      switch (val) {
        case 'whitelist': return ListBasedAccessControl.Whitelist
        case 'blacklist': return ListBasedAccessControl.Blacklist
        default: return ListBasedAccessControl.Disable
      }
    })
    .memoize(getCache)
    .get()

export const TOKEN_BASED_ACCESS_CONTROL: Getter<boolean> =
  env('REFILE_TOKEN_BASED_ACCESS_CONTROL')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const READ_TOKEN_REQUIRED: Getter<boolean> =
  env('REFILE_READ_TOKEN_REQUIRED')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const WRITE_TOKEN_REQUIRED: Getter<boolean> =
  env('REFILE_WRITE_TOKEN_REQUIRED')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const DELETE_TOKEN_REQUIRED: Getter<boolean> =
  env('REFILE_DELETE_TOKEN_REQUIRED')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const SET_PAYLOAD_LIMIT: Getter<number> =
  env('REFILE_SET_PAYLOAD_LIMIT')
    .convert(toInteger)
    .default(PAYLOAD_LIMIT())
    .memoize(getCache)
    .get()

function env(name: string): ValueGetter<string | undefined> {
  return new ValueGetter(name, () => process.env[name])
}

function toBool(val: string | boolean | undefined): boolean | undefined {
  if (val) return val === 'true'
  return false
}

function toInteger(val: string | number | undefined ): number | undefined {
  if (isNumber(val)) return val
  if (val) return Number.parseInt(val, 10)
}

function shouldBePositive(val: number) {
  assert(val > 0)
}
