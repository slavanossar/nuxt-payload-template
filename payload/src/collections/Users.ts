import dotenv from 'dotenv'
import type { CollectionConfig } from 'payload/types'

dotenv.config()

const roleOptions = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Editor',
    value: 'editor',
  },
]

function getRoleIndex(role) {
  return roleOptions.findIndex(({ value }) => role === value)
}

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  auth: true,
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    create: ({ req: { user } }) => {
      return user.role === 'admin'
    },
    read: () => true,
    delete: ({ req: { user } }) => {
      return user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      validate: async (val, { data, user }) => {
        if (!user) {
          return true
        }

        const { role: currentUserRole } = await fetch(
          `${process.env.SITE_URL || ''}/api/users/${user.id}`,
        ).then((res) => res.json())

        const isDowngradingRole =
          getRoleIndex(val) > getRoleIndex(currentUserRole)
        const isEditingSelf = data.email === user.email

        if (currentUserRole === 'admin' && !isEditingSelf) {
          return true
        }

        if (currentUserRole !== 'admin' && val === 'admin') {
          return 'You do not have permission to assign users the Admin role.'
        }

        if (isEditingSelf && isDowngradingRole) {
          return `You cannot downgrade yourself to a role with lower access (${currentUserRole} > ${val})`
        }
      },
      required: true,
      options: roleOptions,
    },
  ],
}

export default Users
