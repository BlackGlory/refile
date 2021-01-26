--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

-- 在WAL模式下, better-sqlite3可充分发挥性能
PRAGMA journal_mode = WAL;

-- SQLite 会将VARCHAR(255)转换为TEXT, 将BOOLEAN转换为NUMERIC, 使用这些数据类型是出于可读性考虑
-- refile资源本身是松散的, 没有自己的表

CREATE TABLE refile_blacklist (
  namespace VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE refile_whitelist (
  namespace VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE refile_token_policy (
  namespace             VARCHAR(255) NOT NULL UNIQUE
, write_token_required  BOOLEAN
, read_token_required   BOOLEAN
, delete_token_required BOOLEAN
);

CREATE TABLE refile_token (
  namespace         VARCHAR(255) NOT NULL
, token             VARCHAR(255) NOT NULL
, read_permission   BOOLEAN      NOT NULL DEFAULT 0 CHECK(read_permission IN (0,1))
, write_permission  BOOLEAN      NOT NULL DEFAULT 0 CHECK(write_permission IN (0,1))
, delete_permission BOOLEAN      NOT NULL DEFAULT 0 CHECK(delete_permission IN (0,1))
, UNIQUE (token, namespace)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

PRAGMA journal_mode = DELETE;

DROP TABLE refile_blacklist;
DROP TABLE refile_whitelist;
DROP TABLE refile_token_policy;
DROP TABLE refile_token;
