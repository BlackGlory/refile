--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

-- 优化 countReferences
CREATE INDEX idx_refile_reference_file_hash
    ON refile_reference(file_hash);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX idx_refile_reference_file_hash;
