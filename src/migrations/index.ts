import * as migration_20241014_131823_pg_init from './20241014_131823_pg_init';
import * as migration_20241016_143916_footer from './20241016_143916_footer';

export const migrations = [
  {
    up: migration_20241014_131823_pg_init.up,
    down: migration_20241014_131823_pg_init.down,
    name: '20241014_131823_pg_init',
  },
  {
    up: migration_20241016_143916_footer.up,
    down: migration_20241016_143916_footer.down,
    name: '20241016_143916_footer'
  },
];
