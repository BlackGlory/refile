export const idSchema = {
  type: 'string'
, pattern: '^.{0,255}$'
}

export const namespaceSchema = {
  type: 'string'
, pattern: '^.{0,255}$'
}

export const hashSchema = {
  type: 'string'
, pattern: '^[0-9a-f]{64}$'
}
