import * as migration_20240821_095742_init_turso from './20240821_095742_init_turso';
import * as migration_20240822_170427_footer from './20240822_170427_footer';
import * as migration_20240822_170741_footer_message_remove from './20240822_170741_footer_message_remove';
import * as migration_20240822_170851_footer_message from './20240822_170851_footer_message';
import * as migration_20240822_171602_footer_tagline from './20240822_171602_footer_tagline';

export const migrations = [
  {
    up: migration_20240821_095742_init_turso.up,
    down: migration_20240821_095742_init_turso.down,
    name: '20240821_095742_init_turso',
  },
  {
    up: migration_20240822_170427_footer.up,
    down: migration_20240822_170427_footer.down,
    name: '20240822_170427_footer',
  },
  {
    up: migration_20240822_170741_footer_message_remove.up,
    down: migration_20240822_170741_footer_message_remove.down,
    name: '20240822_170741_footer_message_remove',
  },
  {
    up: migration_20240822_170851_footer_message.up,
    down: migration_20240822_170851_footer_message.down,
    name: '20240822_170851_footer_message',
  },
  {
    up: migration_20240822_171602_footer_tagline.up,
    down: migration_20240822_171602_footer_tagline.down,
    name: '20240822_171602_footer_tagline'
  },
];
