import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) {
    return true
  }

  if (checkRole(['manager'], user)) {
    return false
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
