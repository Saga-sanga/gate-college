import * as migration_20240821_095742_init_turso from './20240821_095742_init_turso';

export const migrations = [
  {
    up: migration_20240821_095742_init_turso.up,
    down: migration_20240821_095742_init_turso.down,
    name: '20240821_095742_init_turso'
  },
];
