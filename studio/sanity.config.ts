import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {structure} from './src/structure'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation'
import {assist} from '@sanity/assist'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

const homeLocation = {title: 'Homepage', href: '/'} satisfies DocumentLocation

export default defineConfig({
  name: 'default',
  title: "Women's Rights Information Center",

  projectId,
  dataset,

  plugins: [
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/',
            filter: `_type == "wricSettings" || _type == "wricHero"`,
          },
        ]),
        locations: {
          wricSettings: defineLocations({
            locations: [homeLocation],
            message: 'Controls site-wide content on the homepage',
            tone: 'positive',
          }),
          wricHero: defineLocations({
            locations: [homeLocation],
            message: 'Controls the hero section on the homepage',
            tone: 'positive',
          }),
          wricService: defineLocations({
            select: {title: 'title'},
            resolve: (doc) => ({
              locations: [{title: doc?.title ?? 'Service', href: '/#services'}, homeLocation],
            }),
          }),
          wricStaffMember: defineLocations({
            select: {title: 'name'},
            resolve: (doc) => ({
              locations: [{title: doc?.title ?? 'Staff member', href: '/#team'}, homeLocation],
            }),
          }),
          wricBoardMember: defineLocations({
            select: {title: 'name'},
            resolve: (doc) => ({
              locations: [{title: doc?.title ?? 'Board member', href: '/#team'}, homeLocation],
            }),
          }),
        },
      },
    }),
    structureTool({structure}),
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
