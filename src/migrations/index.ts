import * as migration_20240927_073658 from './20240927_073658';
import * as migration_20240929_103058_lock from './20240929_103058_lock';

export const migrations = [
  {
    up: migration_20240927_073658.up,
    down: migration_20240927_073658.down,
    name: '20240927_073658',
  },
  {
    up: migration_20240929_103058_lock.up,
    down: migration_20240929_103058_lock.down,
    name: '20240929_103058_lock'
  },
];
