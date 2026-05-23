/**
 * Patches draft versions of wricService documents to include the
 * same image already set on the published versions.
 *
 * Run: node scripts/patch-service-drafts.mjs
 */

import { createClient } from '@sanity/client'

const TOKEN = 'skfYM2BRsfqgkStaWltyZ2fFuuLB2olVuy3cH9Jh8k3ZYRYWHtl3dKjfcpwZSmJoGaqhjdPUkRiXfeqqcZswkan3jM87UjkvM1a25HlDky0cFAirvu6hA5aXnVg7N9NVw3UCYfsvKj4QylibrGGG7KxdVTrs46QXGlaIXx35qdSBCYxlidWs'

const client = createClient({
  projectId: 'amap9kjd',
  dataset: 'production',
  apiVersion: '2025-09-25',
  token: TOKEN,
  useCdn: false,
})

async function run() {
  // Fetch published docs that have images
  const published = await client.fetch(
    `*[_type == "wricService" && defined(image)]{ _id, title, image }`
  )
  console.log(`Found ${published.length} published service docs with images.`)

  // Fetch all draft versions
  const drafts = await client.fetch(
    `*[_id in path("drafts.wricService*")]{ _id, title }`
  )
  console.log(`Found ${drafts.length} draft service docs.`)

  if (drafts.length === 0) {
    console.log('No drafts to patch — Studio preview should already use published images.')
    return
  }

  // Map published id → image
  const imageByPublishedId = new Map(published.map(d => [d._id, d.image]))

  let patched = 0
  for (const draft of drafts) {
    // draft._id looks like "drafts.wricService-abc123"
    const publishedId = draft._id.replace(/^drafts\./, '')
    const image = imageByPublishedId.get(publishedId)
    if (!image) { console.log(`⚠  No published image for draft ${draft._id}`); continue }

    await client.patch(draft._id).set({ image }).commit()
    console.log(`✓  Patched draft: ${draft.title ?? draft._id}`)
    patched++
  }

  console.log(`\nDone. ${patched} drafts patched.`)
}

run().catch(console.error)
