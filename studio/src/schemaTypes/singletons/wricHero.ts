import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const wricHero = defineType({
  name: 'wricHero',
  title: 'Hero Section',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Background Image',
      description: 'Full-width photo shown behind the hero text',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Sub-headline',
      description: 'Short phrase shown above "Safety. Support." (e.g. "For women and families navigating challenges in their lives.")',
      type: 'string',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero Body Text',
      description: 'Paragraph shown below the main headline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroStat',
      title: 'Impact Number',
      description: 'Large statistic shown in the hero (e.g. "5,200+")',
      type: 'string',
    }),
    defineField({
      name: 'heroStatLabel',
      title: 'Impact Label',
      description: 'Description of the impact number (e.g. "people supported by WRIC programs last year")',
      type: 'string',
    }),
    defineField({
      name: 'heroCTALabel',
      title: 'Button Label',
      description: 'Text on the main call-to-action button (e.g. "Get started with us")',
      type: 'string',
      initialValue: 'Get started with us',
    }),
    defineField({
      name: 'heroCTAUrl',
      title: 'Button Link (optional)',
      description: 'If filled in, the button goes to this URL instead of opening the intake form. Leave blank to keep the intake form popup.',
      type: 'url',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      description: 'Shown in the "Our Mission" section below the hero',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Hero Section'}
    },
  },
})
