import type { AccessArgs } from 'payload'

import type { User } from '../../payload-types'
import { checkRole } from './checkRole'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) =>
  checkRole(['admin', 'manager', 'user'], user)
