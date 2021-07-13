# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.4](https://github.com/BlackGlory/refile/compare/v0.3.3...v0.3.4) (2021-07-13)

### [0.3.3](https://github.com/BlackGlory/refile/compare/v0.3.2...v0.3.3) (2021-07-12)

### [0.3.2](https://github.com/BlackGlory/refile/compare/v0.3.1...v0.3.2) (2021-07-03)

### [0.3.1](https://github.com/BlackGlory/refile/compare/v0.3.0...v0.3.1) (2021-06-21)


### Features

* add /health ([7c4730f](https://github.com/BlackGlory/refile/commit/7c4730f7172955f310522a7686a2bf3d95b3bb32))


### Bug Fixes

* docker build ([ce6e306](https://github.com/BlackGlory/refile/commit/ce6e3066ed2af76824bdcf92bda7ea0ca0cf3a2e))
* docker-compose test ([7aacb00](https://github.com/BlackGlory/refile/commit/7aacb00d8944ca0c63e6f8b1abe0856db7737057))

## [0.3.0](https://github.com/BlackGlory/refile/compare/v0.2.2...v0.3.0) (2021-04-28)


### ⚠ BREAKING CHANGES

* The database schema has been upgraded

* rename ([322ba9d](https://github.com/BlackGlory/refile/commit/322ba9d6857475b629c04f6df92ce5d502042801))

### [0.2.2](https://github.com/BlackGlory/refile/compare/v0.2.1...v0.2.2) (2021-04-28)

### [0.2.1](https://github.com/BlackGlory/refile/compare/v0.2.0...v0.2.1) (2021-03-17)

## 0.2.0 (2021-03-14)


### ⚠ BREAKING CHANGES

* rename /api to /admin
* database schema changed
* /stats => /metrics
* rewrite
* back to the multipart/form-data solution
* The upload interface of form-data was cancelled

### Features

* add pino-pretty for logging ([2a15bb2](https://github.com/BlackGlory/refile/commit/2a15bb29a7e19b8be7dd270f0d053a012f1dd73c))
* disable auto_vacuum ([46de69c](https://github.com/BlackGlory/refile/commit/46de69c2c249bc52403329836cb7b6d2bb19cbac))
* oneOf => anyOf ([e9c94e4](https://github.com/BlackGlory/refile/commit/e9c94e415f5e6f144bd626d26bcc5de9b5b8a573))
* prometheus metrics ([7aad297](https://github.com/BlackGlory/refile/commit/7aad297f6ed3a134495f568267a368202c4ae8c2))
* PUT /files/:hash form-data ([8712a06](https://github.com/BlackGlory/refile/commit/8712a0695cc02492edd861d5d4d50cc084a48992))
* PUT /files/:hash raw-upload ([832ad65](https://github.com/BlackGlory/refile/commit/832ad655429391bc5bb39a231e83d088f69cbd0b))
* rename /api to /admin ([4c6dca2](https://github.com/BlackGlory/refile/commit/4c6dca20943b985c34628e5390238da805af242c))
* rename refile_id to namespace ([e593918](https://github.com/BlackGlory/refile/commit/e5939182cce5f476eb50f6c0941fcf5eedc8aa8f))
* rename stats to metrics ([4711adb](https://github.com/BlackGlory/refile/commit/4711adb81c3f5a14e39afc49934e719d8c823c32))
* rewrite ([756faba](https://github.com/BlackGlory/refile/commit/756faba6203aba9fecf6f357222c3c75528f19da))
* support aborting connection ([60256b0](https://github.com/BlackGlory/refile/commit/60256b0a96616fb8ed6f759feb0be3128d689e4f))
* support catching hash validator error ([ec2f467](https://github.com/BlackGlory/refile/commit/ec2f4674fc337be39ea033faa3e06c20e024325f))
* support pm2 ([7bec5f6](https://github.com/BlackGlory/refile/commit/7bec5f6f272221c5814db5343ea8ce1843ea9f11))
* support REFILE_DATA ([4d68a30](https://github.com/BlackGlory/refile/commit/4d68a307447f9ae63a14bbbdf932f50f5473437c))


### Bug Fixes

* env ([26f4276](https://github.com/BlackGlory/refile/commit/26f42760c9441ef54485d00ce45cd4fc0d13c312))
* examples ([0f19f97](https://github.com/BlackGlory/refile/commit/0f19f97e9073602d5cdd1da62390ae236eb65ceb))
* getAllItemIds, getAllnamespaces, getFileHashesByItem, getItemIdsByFile ([f754253](https://github.com/BlackGlory/refile/commit/f75425300743d497baea4ba94f8d7f1503d727fd))
* resetEnvironment ([4f9dc45](https://github.com/BlackGlory/refile/commit/4f9dc45f573b5ff58d4997de757737b91af6d54e))
* scripts ([373cb92](https://github.com/BlackGlory/refile/commit/373cb925b5f4d69189704464ebd7b5d2c840419b))
* UnhandledPromiseRejectionWarning ([e95f421](https://github.com/BlackGlory/refile/commit/e95f421c15b928e0a14b9ab96d5891e2b9920c76))
