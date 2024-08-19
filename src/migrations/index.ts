import * as migration_20240819_064429_initial from './20240819_064429_initial';

export const migrations = [
  {
    up: migration_20240819_064429_initial.up,
    down: migration_20240819_064429_initial.down,
    name: '20240819_064429_initial'
  },
];
