import {sanityFetch} from '@/sanity/lib/live'
import {wricSettingsQuery, wricHeroQuery, wricServicesQuery, wricStaffQuery, wricBoardQuery} from '@/sanity/lib/queries'
import {WricOnePage} from '@/app/components/wric/wric-one-page'

export const revalidate = 0

export default async function Page() {
  const [{data: settings}, {data: hero}, {data: services}, {data: staff}, {data: board}] = await Promise.all([
    sanityFetch({query: wricSettingsQuery}),
    sanityFetch({query: wricHeroQuery}),
    sanityFetch({query: wricServicesQuery}),
    sanityFetch({query: wricStaffQuery}),
    sanityFetch({query: wricBoardQuery}),
  ])

  return (
    <WricOnePage
      sanitySettings={settings as any}
      sanityHero={hero as any}
      sanityServices={(services ?? []) as any[]}
      sanityStaff={(staff ?? []) as any[]}
      sanityBoard={(board ?? []) as any[]}
    />
  )
}
