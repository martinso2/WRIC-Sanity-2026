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
      description: 'Name of the service as it appears on the website (e.g. "Career Services")',
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
    defineField({
      name: 'actionLabel',
      title: 'Button Label',
      description: 'Text on the "call to action" button (e.g. "Get started", "Learn more")',
      type: 'string',
      initialValue: 'Get started',
    }),
    defineField({
      name: 'actionType',
      title: 'Button Action',
      description: 'What happens when someone clicks the button',
      type: 'string',
      options: {
        list: [
          {title: 'Open intake form (default)', value: 'modal'},
          {title: 'Send an email', value: 'email'},
          {title: 'Go to a link / page', value: 'link'},
        ],
        layout: 'radio',
      },
      initialValue: 'modal',
    }),
    defineField({
      name: 'actionUrl',
      title: 'Email address or URL',
      description: 'For "Send an email": enter an email address (e.g. info@wric.org). For "Go to a link": enter the full URL (e.g. https://wric.org/apply).',
      type: 'string',
      hidden: ({parent}) => !parent?.actionType || parent?.actionType === 'modal',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Short labels shown under the summary (e.g. "Resume help", "ESL")',
      type: 'array',
      of: [{type: 'string'}],
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
      description: 'Controls the position of this service on the page. Lower numbers appear first.',
      type: 'number',
      initialValue: 99,
    }),
    // Developer-only — connects to the modal popup system
    defineField({
      name: 'modalId',
      title: 'Modal to Open',
      type: 'string',
      hidden: true,
      initialValue: 'intake',
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
