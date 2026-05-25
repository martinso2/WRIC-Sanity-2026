import {notFound} from 'next/navigation'

// The WRIC site is a single-page app; no slug-based pages exist.
export default function Page() {
  notFound()
}
