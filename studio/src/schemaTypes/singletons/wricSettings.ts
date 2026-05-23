import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const wricSettings = defineType({
  name: 'wricSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Shown under the org name in the header (e.g. "Est. 1972 · Englewood, NJ")',
      type: 'string',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero Lede',
      description: 'Short sentence below the hero headline',
      type: 'string',
    }),
    defineField({
      name: 'heroStat',
      title: 'Hero Impact Stat',
      description: 'e.g. "5,200+"',
      type: 'string',
    }),
    defineField({
      name: 'heroStatLabel',
      title: 'Hero Stat Label',
      description: 'e.g. "people supported last year"',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Main Phone',
      type: 'string',
    }),
    defineField({
      name: 'phoneSpanish',
      title: 'Spanish Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
    }),
    defineField({
      name: 'spanishHoursNote',
      title: 'Spanish Hours Note',
      type: 'string',
    }),
    defineField({
      name: 'taxNote',
      title: 'Tax / EIN Note',
      type: 'string',
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate URL',
      type: 'url',
    }),
    defineField({
      name: 'volunteerUrl',
      title: 'Volunteer URL',
      type: 'url',
    }),
    defineField({
      name: 'orientationUrl',
      title: 'Virtual Orientation URL',
      type: 'url',
    }),
    defineField({
      name: 'clientPortalUrl',
      title: 'Client Portal URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'galaTitle',
      title: 'Gala / Event Title',
      type: 'string',
    }),
    defineField({
      name: 'galaBody',
      title: 'Gala / Event Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'galaImage',
      title: 'Gala Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'galaVisible',
      title: 'Show Gala Section',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
