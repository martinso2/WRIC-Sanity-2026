import {defineField, defineType} from 'sanity'

export const wricVideo = defineType({
  name: 'wricVideo',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'embedUrl',
      title: 'Embed URL',
      description: 'e.g. https://www.youtube.com/embed/VIDEO_ID',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'Link to the original video page',
      type: 'url',
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date Label',
      description: 'Displayed on the card e.g. "Mar 30, 2021" or "Oral history"',
      type: 'string',
    }),
    defineField({
      name: 'sortDate',
      title: 'Sort Date',
      type: 'date',
    }),
    defineField({
      name: 'sourcePage',
      title: 'Source / Category',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Date (oldest first)',
      name: 'sortDateAsc',
      by: [{field: 'sortDate', direction: 'asc'}],
    },
    {
      title: 'Date (newest first)',
      name: 'sortDateDesc',
      by: [{field: 'sortDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'dateLabel'},
  },
})
