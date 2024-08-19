import type { User } from 'src/payload-types'
import type { FieldHook } from 'payload'

// ensure there is always a `user` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User & { id: string }> = async ({ req, data }) => {
  const isAdmin = req.user?.roles.includes('admin') || data.email === 'dev@payload.com' // for the seed script

  if (!isAdmin) {
    return ['user']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles]
}
