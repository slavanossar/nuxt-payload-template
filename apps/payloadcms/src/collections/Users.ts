import dotenv from 'dotenv'
import type { CollectionConfig, FieldHook, Validate } from 'payload'
import type { User } from 'payload-types'

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

const getRoleIndex = (role: string) => {
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
    group: 'Admin',
    useAsTitle: 'fullName',
  },
  access: {
    create: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    read: () => true,
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'fullName',
          type: 'text',
          admin: { hidden: true },
          hooks: {
            beforeChange: [
              (({ data }) =>
                data
                  ? [data.firstName, data.lastName].join(' ')
                  : '') as FieldHook<User>,
            ],
          },
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      // validate: (async (val, { data, user }) => {
      //   if (!user || !val) {
      //     return true
      //   }

      //   const { role: currentUserRole } = await fetch(
      //     `${process.env.PAYLOAD_PUBLIC_SITE_URL}${process.env.PAYLOAD_PUBLIC_API_ROUTE}/users/${user.id}`,
      //   ).then((res) => res.json())

      //   const isDowngradingRole =
      //     getRoleIndex(val) > getRoleIndex(currentUserRole)
      //   const isEditingSelf = data.email === user.email

      //   if (currentUserRole === 'admin' && !isEditingSelf) {
      //     return true
      //   }

      //   if (currentUserRole !== 'admin' && val === 'admin') {
      //     return 'You do not have permission to assign users the Admin role.'
      //   }

      //   if (isEditingSelf && isDowngradingRole) {
      //     return `You cannot downgrade yourself to a role with lower access (${currentUserRole} > ${val})`
      //   }
      // }) as Validate<string, User, any>,
      required: true,
      options: roleOptions,
    },
  ],
}

export default Users
