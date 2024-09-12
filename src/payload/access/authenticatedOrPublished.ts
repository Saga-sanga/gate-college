import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (checkRole(['admin', 'manager'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
