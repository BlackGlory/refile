import pkg from 'ts-jest'
import { readJSONFileSync } from 'extra-filesystem'

const { pathsToModuleNameMapper } = pkg
const { compilerOptions } = readJSONFileSync('./tsconfig.base.json')

export default {
  preset: 'ts-jest/presets/default-esm'
, testEnvironment: 'node'
, resolver: '@blackglory/jest-resolver'
, testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)']
, moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
  // hack https://github.com/facebook/jest/issues/2070
, modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__']
, setupFilesAfterEnv: ['jest-extended/all']
}
