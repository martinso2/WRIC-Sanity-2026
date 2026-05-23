import {defineField, defineType} from 'sanity'

export const wricService = defineType({
  name: 'wricService',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      description: 'Shown in the expanded service view',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'actionLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'modalId',
      title: 'Modal to Open',
      type: 'string',
      options: {
        list: [
          {title: 'Intake / Get Started', value: 'intake'},
          {title: 'Contact', value: 'contact'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Short chips shown on the card (e.g. "Job search", "ESL")',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {imageDescriptionField: 'alt'},
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
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
