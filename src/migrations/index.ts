import * as migration_20240826_092935_init from './20240826_092935_init';
import * as migration_20240826_093039_hero from './20240826_093039_hero';

export const migrations = [
  {
    up: migration_20240826_092935_init.up,
    down: migration_20240826_092935_init.down,
    name: '20240826_092935_init',
  },
  {
    up: migration_20240826_093039_hero.up,
    down: migration_20240826_093039_hero.down,
    name: '20240826_093039_hero'
  },
];
