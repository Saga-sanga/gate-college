import * as migration_20241014_131823_pg_init from './20241014_131823_pg_init';

export const migrations = [
  {
    up: migration_20241014_131823_pg_init.up,
    down: migration_20241014_131823_pg_init.down,
    name: '20241014_131823_pg_init'
  },
];
