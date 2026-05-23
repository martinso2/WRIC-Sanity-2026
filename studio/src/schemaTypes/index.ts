import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {wricSettings} from './singletons/wricSettings'
import {wricService} from './documents/wricService'
import {wricStaffMember} from './documents/wricStaffMember'
import {wricBoardMember} from './documents/wricBoardMember'
import {wricTimelineMilestone} from './documents/wricTimelineMilestone'
import {wricVideo} from './documents/wricVideo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  wricSettings,
  // Documents
  page,
  post,
  person,
  wricService,
  wricStaffMember,
  wricBoardMember,
  wricTimelineMilestone,
  wricVideo,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
]
