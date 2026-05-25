import {wricSettings} from './singletons/wricSettings'
import {wricHero} from './singletons/wricHero'
import {wricMission} from './singletons/wricMission'
import {wricService} from './documents/wricService'
import {wricContentSection} from './documents/wricContentSection'
import {wricStaffMember} from './documents/wricStaffMember'
import {wricBoardMember} from './documents/wricBoardMember'
import {wricVideo} from './documents/wricVideo'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  wricSettings,
  wricHero,
  wricMission,
  // Documents
  wricService,
  wricContentSection,
  wricStaffMember,
  wricBoardMember,
  wricVideo,
]
