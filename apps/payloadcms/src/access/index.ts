import type { Access, Where } from 'payload'
import type { Staff } from 'payload-types'

export const staffRoles = ['super_admin', 'admin', 'sales']

export const and =
  (...checks: Access[]): Access =>
  async (context) => {
    let result: Where | boolean = true

    for (let check of checks) {
      result = await check(context)

      if (!result) return false
    }

    return result
  }

export const or =
  (...checks: Access[]): Access =>
  async (context) => {
    for (let check of checks) {
      const result = await check(context)

      if (result) return result
    }

    return false
  }

export const not =
  (check: Access): Access =>
  async (context) => {
    return !(await check(context))
  }

/** Collection Access */
export const isSuperAdmin: Access<Staff> = ({ req: { user } }) =>
  user?.role === 'super_admin'
export const isAdmin: Access<Staff> = ({ req: { user } }) =>
  user?.role === 'admin'
export const isStaff: Access<Staff> = ({ req: { user } }) =>
  user?.collection === 'staff'
