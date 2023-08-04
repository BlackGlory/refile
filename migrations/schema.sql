-- 在WAL模式下, better-sqlite3可充分发挥性能
PRAGMA journal_mode = WAL;

-- SQLite 会将VARCHAR(255)转换为TEXT, 将BOOLEAN转换为NUMERIC, 使用这些数据类型是出于可读性考虑
-- refile资源本身是松散的, 没有自己的表

CREATE TABLE refile_file (
  hash     VARCHAR(64) NOT NULL UNIQUE
, location TEXT
);

CREATE TABLE refile_reference (
  namespace VARCHAR(255) NOT NULL
, id        VARCHAR(255) NOT NULL
, file_hash VARCHAR(64)  NOT NULL
, UNIQUE (namespace, id, file_hash)
);

-- 优化 countReferences
CREATE INDEX idx_refile_reference_file_hash
    ON refile_reference(file_hash);
