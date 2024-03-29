export const idSchema = {
  type: 'string'
, pattern: '^[a-zA-Z0-9\\.\\-_]{0,255}$'
}

export const namespaceSchema = {
  type: 'string'
, pattern: '^[a-zA-Z0-9\\.\\-_]{0,255}$'
}

export const hashSchema = {
  type: 'string'
, pattern: '^[0-9a-f]{64}$'
}
