import {BlockContentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const wricContentSection = defineType({
  name: 'wricContentSection',
  title: 'Content Section',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    // ── Internal label ────────────────────────────────────────────────
    defineField({
      name: 'internalTitle',
      title: 'Internal Label',
      description: 'Only shown in the Studio — helps you identify this section (e.g. "About Our Approach")',
      type: 'string',
      validation: (r) => r.required(),
    }),

    // ── Image ─────────────────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      description: 'Which side of the section the image appears on',
      type: 'string',
      options: {
        list: [
          {title: 'Image on the right', value: 'right'},
          {title: 'Image on the left', value: 'left'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),

    // ── Text content ──────────────────────────────────────────────────
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      description: 'Smaller text shown above the headline (e.g. a kicker/category label)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      rows: 4,
    }),

    // ── Button ────────────────────────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'Button Label',
      description: 'Text on the action button (e.g. "Learn more", "Get started")',
      type: 'string',
    }),
    defineField({
      name: 'ctaType',
      title: 'Button Action',
      description: 'What happens when someone clicks the button',
      type: 'string',
      options: {
        list: [
          {title: 'Open intake form', value: 'modal'},
          {title: 'Send an email', value: 'email'},
          {title: 'Go to a link / page', value: 'link'},
        ],
        layout: 'radio',
      },
      initialValue: 'link',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Email address or URL',
      description: 'For "Send an email": enter an email address. For "Go to a link": enter the full URL (https://...).',
      type: 'string',
      hidden: ({parent}) => !parent?.ctaType || parent?.ctaType === 'modal',
    }),

    // ── Display ───────────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Controls where this section appears on the page. Lower numbers appear first.',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'visible',
      title: 'Visible on site',
      description: 'Uncheck to hide this section without deleting it',
      type: 'boolean',
      initialValue: true,
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
    select: {title: 'internalTitle', subtitle: 'headline', media: 'image'},
  },
})
