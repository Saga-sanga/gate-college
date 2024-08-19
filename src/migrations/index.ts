import * as migration_20240819_064429_initial from './20240819_064429_initial';
import * as migration_20240819_104350_user from './20240819_104350_user';
import * as migration_20240819_105631_user_roles from './20240819_105631_user_roles';

export const migrations = [
  {
    up: migration_20240819_064429_initial.up,
    down: migration_20240819_064429_initial.down,
    name: '20240819_064429_initial',
  },
  {
    up: migration_20240819_104350_user.up,
    down: migration_20240819_104350_user.down,
    name: '20240819_104350_user',
  },
  {
    up: migration_20240819_105631_user_roles.up,
    down: migration_20240819_105631_user_roles.down,
    name: '20240819_105631_user_roles'
  },
];
