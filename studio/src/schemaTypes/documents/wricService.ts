import {defineField, defineType} from 'sanity'

export const wricService = defineType({
  name: 'wricService',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      readOnly: true,
      description: 'Contact your developer to rename a service.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description shown on the service card',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'details',
      title: 'Detail Bullets',
      description: 'Each bullet appears in the expanded service view',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // Developer-only fields — hidden from client view
    defineField({
      name: 'actionLabel',
      title: 'CTA Button Label',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'modalId',
      title: 'Modal to Open',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      description: 'Photo or illustration shown on the service card',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      hidden: true,
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
    select: {title: 'title', media: 'image'},
  },
})
