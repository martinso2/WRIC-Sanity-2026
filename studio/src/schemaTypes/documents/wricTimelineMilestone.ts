import {defineField, defineType} from 'sanity'

export const wricTimelineMilestone = defineType({
  name: 'wricTimelineMilestone',
  title: 'History Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year / Era',
      description: 'e.g. "1973" or "Today"',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
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
      name: 'accent',
      title: 'Accent Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Coral', value: 'coral'},
          {title: 'Teal', value: 'teal'},
          {title: 'Sage', value: 'sage'},
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Chronological',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'year', subtitle: 'title', media: 'image'},
  },
})
