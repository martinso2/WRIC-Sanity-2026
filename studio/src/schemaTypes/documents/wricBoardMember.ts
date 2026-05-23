import {defineField, defineType} from 'sanity'

export const wricBoardMember = defineType({
  name: 'wricBoardMember',
  title: 'Board Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Officer Role',
      description: 'e.g. "Chair", "Treasurer" — leave blank for general members',
      type: 'string',
    }),
    defineField({
      name: 'isEmeritus',
      title: 'Emeritus / Honorary',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role'},
  },
})
