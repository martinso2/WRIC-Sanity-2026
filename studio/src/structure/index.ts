import {CogIcon, UsersIcon, BlockElementIcon, ImagesIcon, StarIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('WRIC Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('wricSettings').documentId('wricSettings')),
      S.divider(),
      S.listItem()
        .title('Services')
        .icon(StarIcon)
        .child(S.documentTypeList('wricService').title('Services')),
      S.listItem()
        .title('Staff Members')
        .icon(UsersIcon)
        .child(S.documentTypeList('wricStaffMember').title('Staff Members')),
      S.listItem()
        .title('Board Members')
        .icon(BlockElementIcon)
        .child(S.documentTypeList('wricBoardMember').title('Board Members')),
      S.listItem()
        .title('Videos')
        .icon(ImagesIcon)
        .child(S.documentTypeList('wricVideo').title('Videos')),
    ])
