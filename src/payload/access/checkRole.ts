import type { User } from 'src/payload-types'

// Check if the passed user has the given role
export const checkRole = (allRoles: User['roles'] = [], user: User = undefined): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return user.roles.some((individualRole) => {
          return individualRole === role
        })
      })
    )
      return true
  }

  return false
}
