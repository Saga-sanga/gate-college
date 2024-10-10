import * as migration_20241008_092925_postgres from './20241008_092925_postgres';

export const migrations = [
  {
    up: migration_20241008_092925_postgres.up,
    down: migration_20241008_092925_postgres.down,
    name: '20241008_092925_postgres'
  },
];
