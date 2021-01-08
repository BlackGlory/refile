import { getDatabase } from '../database'

export function getAllIdsWithJsonSchema(): string[] {
  const result = getDatabase().prepare(`
    SELECT refile_id FROM refile_json_schema
  `).all()
  return result.map(x => x['refile_id'])
}

export function getJsonSchema(id: string): string | null {
  const result = getDatabase().prepare(`
    SELECT json_schema FROM refile_json_schema
     WHERE refile_id = $id;
  `).get({ id })
  if (result) return result['json_schema']
  else return null
}

export function setJsonSchema({ id, schema }: { id: string; schema: string }): void {
  getDatabase().prepare(`
    INSERT INTO refile_json_schema (refile_id, json_schema)
    VALUES ($id, $schema)
        ON CONFLICT(refile_id)
        DO UPDATE SET json_schema = $schema;
  `).run({ id, schema })
}

export function removeJsonSchema(id: string): void {
  getDatabase().prepare(`
    DELETE FROM refile_json_schema
     WHERE refile_id = $id;
  `).run({ id })
}
