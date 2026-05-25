import {sanityFetch} from '@/sanity/lib/live'
import {wricSettingsQuery, wricServicesQuery, wricStaffQuery, wricBoardQuery} from '@/sanity/lib/queries'
import {WricOnePage} from '@/app/components/wric/wric-one-page'

export const revalidate = 0

export default async function Page() {
  const [{data: settings}, {data: services}, {data: staff}, {data: board}] = await Promise.all([
    sanityFetch({query: wricSettingsQuery}),
    sanityFetch({query: wricServicesQuery}),
    sanityFetch({query: wricStaffQuery}),
    sanityFetch({query: wricBoardQuery}),
  ])

  return (
    <WricOnePage
      sanitySettings={settings}
      sanityServices={services ?? []}
      sanityStaff={staff ?? []}
      sanityBoard={board ?? []}
    />
  )
}
