import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const wricSettings = defineType({
  name: 'wricSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'contact', title: 'Contact & Hours', default: true},
    {name: 'gala', title: 'Event / Gala'},
    {name: 'mission', title: 'Mission & Hero'},
    {name: 'social', title: 'Social & Links'},
  ],
  fields: [
    // ── Contact & Hours ──────────────────────────────────────────────
    defineField({
      name: 'phone',
      title: 'Main Phone (English)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phoneSpanish',
      title: 'Phone (Español)',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'hours',
      title: 'Office Hours',
      description: 'e.g. "Mon – Thu 9 am – 5 pm, Fri 9 am – 3 pm"',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'spanishHoursNote',
      title: 'Spanish Hours Note',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'taxNote',
      title: 'Tax / EIN Note',
      description: 'Shown in the footer (e.g. "WRIC is a 501(c)(3) — EIN 23-7453339")',
      type: 'string',
      group: 'contact',
    }),

    // ── Event / Gala ─────────────────────────────────────────────────
    defineField({
      name: 'galaVisible',
      title: 'Show Event Section',
      description: 'Toggle to hide the gala/event section from the homepage',
      type: 'boolean',
      initialValue: true,
      group: 'gala',
    }),
    defineField({
      name: 'galaTitle',
      title: 'Event Headline',
      type: 'string',
      group: 'gala',
    }),
    defineField({
      name: 'galaBody',
      title: 'Event Body Text',
      type: 'text',
      rows: 3,
      group: 'gala',
    }),
    defineField({
      name: 'galaImage',
      title: 'Event Photo',
      type: 'image',
      options: {hotspot: true},
      group: 'gala',
    }),

    // ── Mission & Hero ────────────────────────────────────────────────
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
      group: 'mission',
    }),
    defineField({
      name: 'heroStat',
      title: 'Hero Impact Number',
      description: 'e.g. "5,200+"',
      type: 'string',
      group: 'mission',
    }),
    defineField({
      name: 'heroStatLabel',
      title: 'Hero Stat Label',
      description: 'e.g. "people supported last year"',
      type: 'string',
      group: 'mission',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero Sub-headline',
      description: 'Short sentence shown below the main hero headline',
      type: 'string',
      group: 'mission',
    }),

    // ── Social & Links ────────────────────────────────────────────────
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate Page URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'volunteerUrl',
      title: 'Volunteer Page URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'orientationUrl',
      title: 'Virtual Orientation URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'clientPortalUrl',
      title: 'Client Portal URL',
      type: 'url',
      group: 'social',
    }),

    // Developer-only
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
