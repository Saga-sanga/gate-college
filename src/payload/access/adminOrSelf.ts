import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user)) return true

  return {
    id: {
      equals: user?.id,
    },
  }
}
