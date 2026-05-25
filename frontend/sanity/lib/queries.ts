import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// WRIC queries
export const wricSettingsQuery = defineQuery(`
  *[_type == "wricSettings"][0]{
    _id, _type,
    orgName, tagline, missionStatement, heroLede, heroStat, heroStatLabel,
    phone, phoneSpanish, email, address, hours, spanishHoursNote, taxNote,
    donateUrl, volunteerUrl, orientationUrl, clientPortalUrl,
    facebookUrl, instagramUrl, linkedinUrl,
    galaTitle, galaBody, galaVisible
  }
`)

export const wricServicesQuery = defineQuery(`
  *[_type == "wricService"] | order(order asc) {
    _id, _type, title, summary, details, actionLabel, modalId, tags,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`)

export const wricStaffQuery = defineQuery(`
  *[_type == "wricStaffMember"] | order(order asc) {
    _id, _type, name, title, email, featured,
    "image": image.asset->url
  }
`)

export const wricBoardQuery = defineQuery(`
  *[_type == "wricBoardMember"] | order(order asc) {
    _id, _type, name, role, isEmeritus
  }
`)

export const wricVideosQuery = defineQuery(`
  *[_type == "wricVideo"] | order(sortDate asc) {
    _id, title, description, provider, embedUrl, externalUrl, dateLabel, sourcePage
  }
`)
