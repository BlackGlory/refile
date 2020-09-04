// const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production'

export const PORT: number = Number(process.env.PORT)
export const HOST: string = process.env.HOST || '127.0.0.1'
export const HASH_BLOCK_SIZE: number = Number(process.env.HASH_BLOCK_SIZE)
