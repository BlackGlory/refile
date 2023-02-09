import { CustomError } from '@blackglory/errors'

export class FileAlreadyExists extends CustomError {}
export class ReferencesIsZero extends CustomError {}
export class IncorrectHashList extends CustomError {}
export class IncorrectFileHash extends CustomError {}
