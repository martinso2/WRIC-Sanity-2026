import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const wricMission = defineType({
  name: 'wricMission',
  title: 'Our Mission Section',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    // ── Headline ──────────────────────────────────────────────────────
    defineField({
      name: 'headline1',
      title: 'Headline — Word 1',
      description: 'First word of the mission headline (e.g. "Knowledge.")',
      type: 'string',
      initialValue: 'Knowledge.',
    }),
    defineField({
      name: 'headline2',
      title: 'Headline — Word 2',
      description: 'Second word of the mission headline (e.g. "Opportunity.")',
      type: 'string',
      initialValue: 'Opportunity.',
    }),
    defineField({
      name: 'headline3',
      title: 'Headline — Word 3 (accent)',
      description: 'Third word shown in italics / gold (e.g. "Dignity.")',
      type: 'string',
      initialValue: 'Dignity.',
    }),

    // ── Mission Statement ─────────────────────────────────────────────
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      description: 'Paragraph shown below the headline',
      type: 'text',
      rows: 4,
    }),

    // ── Stats ─────────────────────────────────────────────────────────
    defineField({
      name: 'stat1Num',
      title: 'Stat 1 — Number',
      description: 'e.g. "54 yrs"',
      type: 'string',
      initialValue: '54 yrs',
    }),
    defineField({
      name: 'stat1Label',
      title: 'Stat 1 — Label',
      description: 'e.g. "Serving Bergen County since 1972"',
      type: 'string',
      initialValue: 'Serving Bergen County since 1972',
    }),
    defineField({
      name: 'stat2Num',
      title: 'Stat 2 — Number',
      description: 'e.g. "7"',
      type: 'string',
      initialValue: '7',
    }),
    defineField({
      name: 'stat2Label',
      title: 'Stat 2 — Label',
      description: 'e.g. "Core programs, integrated under one roof"',
      type: 'string',
      initialValue: 'Core programs, integrated under one roof',
    }),
    defineField({
      name: 'stat3Num',
      title: 'Stat 3 — Number',
      description: 'e.g. "$0"',
      type: 'string',
      initialValue: '$0',
    }),
    defineField({
      name: 'stat3Label',
      title: 'Stat 3 — Label',
      description: 'e.g. "Free, low-cost, or subsidized services"',
      type: 'string',
      initialValue: 'Free, low-cost, or subsidized services',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Our Mission Section'}
    },
  },
})
