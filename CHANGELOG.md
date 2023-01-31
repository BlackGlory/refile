# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.1](https://github.com/BlackGlory/refile/compare/v0.7.0...v0.7.1) (2023-01-31)

## [0.7.0](https://github.com/BlackGlory/refile/compare/v0.6.1...v0.7.0) (2022-12-20)


### ⚠ BREAKING CHANGES

* The `Accept-Version` header is semver now

* upgrade dependencies ([b4115a5](https://github.com/BlackGlory/refile/commit/b4115a5f9782639a33dbf5fb784bf6b644810ba4))

### [0.6.1](https://github.com/BlackGlory/refile/compare/v0.6.0...v0.6.1) (2022-12-08)

## [0.6.0](https://github.com/BlackGlory/refile/compare/v0.5.11...v0.6.0) (2022-12-01)


### ⚠ BREAKING CHANGES

* - Removed HTTP2 support.
- Removed `/metrics` route.

* upgrade dependencies ([086f5ce](https://github.com/BlackGlory/refile/commit/086f5ce648670be04569bead4eb78f4b86586346))

### [0.5.11](https://github.com/BlackGlory/refile/compare/v0.5.10...v0.5.11) (2022-09-07)

### [0.5.10](https://github.com/BlackGlory/refile/compare/v0.5.9...v0.5.10) (2022-08-11)

### [0.5.9](https://github.com/BlackGlory/refile/compare/v0.5.8...v0.5.9) (2022-07-27)

### [0.5.8](https://github.com/BlackGlory/refile/compare/v0.5.7...v0.5.8) (2022-02-18)


### Bug Fixes

* getFileLocation ([8f0bbb4](https://github.com/BlackGlory/refile/commit/8f0bbb424a41450af2757b796a4c344935f746c5))

### [0.5.7](https://github.com/BlackGlory/refile/compare/v0.5.6...v0.5.7) (2022-02-18)


### Features

* add `get file location` ([4ce7255](https://github.com/BlackGlory/refile/commit/4ce72550e3f2ab89bf69044dad1806d09ceb9875))

### [0.5.6](https://github.com/BlackGlory/refile/compare/v0.5.5...v0.5.6) (2022-02-17)


### Bug Fixes

* http status codes that are inconsistent with the documentation ([d478172](https://github.com/BlackGlory/refile/commit/d478172615428f6354176f34af9d9b086b29374b))

### [0.5.5](https://github.com/BlackGlory/refile/compare/v0.5.4...v0.5.5) (2022-02-16)

### [0.5.4](https://github.com/BlackGlory/refile/compare/v0.5.3...v0.5.4) (2022-02-10)


### Features

* add removeReferencesByNamespace ([cf44d3e](https://github.com/BlackGlory/refile/commit/cf44d3e7d4654bd8cfb13dea2b4671abfe614b04))

### [0.5.3](https://github.com/BlackGlory/refile/compare/v0.5.2...v0.5.3) (2022-01-16)


### Features

* add accept-version support ([2d5e7b1](https://github.com/BlackGlory/refile/commit/2d5e7b1c4c63d8f2c486e85d36b1e997ace0d732))
* add cache-control header ([494c4df](https://github.com/BlackGlory/refile/commit/494c4df800de929af54921419e7f01e4ba8ac0f5))


### Bug Fixes

* **docker:** add curl ([11ef248](https://github.com/BlackGlory/refile/commit/11ef24874a6f1358c9e866b30ae69973d9baaafc))
* **docker:** healthcheck ([cfdabe5](https://github.com/BlackGlory/refile/commit/cfdabe56d98b14ab4ac198ec906a4510262e074f))
* **docker:** healthcheck ([00f0093](https://github.com/BlackGlory/refile/commit/00f00936fad39369991766b1e6c0cd188de9048a))

### [0.5.2](https://github.com/BlackGlory/refile/compare/v0.5.1...v0.5.2) (2021-10-14)

### [0.5.1](https://github.com/BlackGlory/refile/compare/v0.5.0...v0.5.1) (2021-10-08)

## [0.5.0](https://github.com/BlackGlory/refile/compare/v0.4.0...v0.5.0) (2021-07-28)


### ⚠ BREAKING CHANGES

* Replace REFILE_DATA with REFILE_DATABASE, REFILE_STORAGE

### Features

* replace REFILE_DATA with REFILE_DATABASE, REFILE_STORAGE ([a60cfa2](https://github.com/BlackGlory/refile/commit/a60cfa27b49afa09d25e744df4e236faf906c938))

## [0.4.0](https://github.com/BlackGlory/refile/compare/v0.3.4...v0.4.0) (2021-07-26)


### ⚠ BREAKING CHANGES

* `remove reference` and `remove references by item` no longer
trigger garbage collection

### Features

* add `garbage collect` ([9f4e7c8](https://github.com/BlackGlory/refile/commit/9f4e7c83af5ff130d0ca617d1e3dc389e8f86044))
* add removeAllUnreferencedFiles ([33ee3af](https://github.com/BlackGlory/refile/commit/33ee3af2db04f63a6dd00a1f22548ae13ac22793))

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
