/**
 * Uploads service card images from /public/images/services/ to Sanity
 * and patches each service document with the image asset reference.
 *
 * Run from the project root:
 *   node scripts/upload-service-images.mjs
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images/services')

const TOKEN = 'skfYM2BRsfqgkStaWltyZ2fFuuLB2olVuy3cH9Jh8k3ZYRYWHtl3dKjfcpwZSmJoGaqhjdPUkRiXfeqqcZswkan3jM87UjkvM1a25HlDky0cFAirvu6hA5aXnVg7N9NVw3UCYfsvKj4QylibrGGG7KxdVTrs46QXGlaIXx35qdSBCYxlidWs'

const client = createClient({
  projectId: 'amap9kjd',
  dataset: 'production',
  apiVersion: '2025-09-25',
  token: TOKEN,
  useCdn: false,
})

const serviceImageMap = [
  { title: 'Career Services',          file: 'career-services-classroom.jpg', alt: 'Career services workshop' },
  { title: 'Housing',                  file: 'housing.jpeg',                  alt: 'Illustration of a path toward stable housing' },
  { title: 'Supportive Services',      file: 'support.jpeg',                  alt: 'Women gathered in conversation for supportive services' },
  { title: 'Victim Services',          file: 'victim-services-2.jpg',         alt: 'WRIC advocacy event for financial abuse awareness' },
  { title: 'Domestic Violence Support',file: 'domestic-violence.jpeg',        alt: 'Illustration of women surrounded by leaves and flowers' },
  { title: 'Human Trafficking Support',file: 'sex-traffic.jpeg',              alt: 'Illustration of a woman in profile with layered leaves' },
  { title: 'Wellness & Trauma Support',file: 'wellness-2.jpeg',               alt: 'Creative arts therapy session outdoors' },
]

function mimeType(filename) {
  if (filename.endsWith('.png'))  return 'image/png'
  if (filename.endsWith('.jpeg')) return 'image/jpeg'
  return 'image/jpeg'
}

async function run() {
  const serviceDocs = await client.fetch('*[_type == "wricService"]{ _id, title }')
  const docByTitle = new Map(serviceDocs.map(d => [d.title.toLowerCase().trim(), d._id]))

  let uploaded = 0, skipped = 0

  for (const { title, file, alt } of serviceImageMap) {
    const imagePath = path.join(IMAGES_DIR, file)
    const docId = docByTitle.get(title.toLowerCase().trim())

    if (!docId) { console.log(`⚠  No doc found for: ${title}`); skipped++; continue }
    if (!existsSync(imagePath)) { console.log(`⚠  File not found: ${file}`); skipped++; continue }

    try {
      const asset = await client.assets.upload('image', createReadStream(imagePath), {
        filename: file,
        contentType: mimeType(file),
      })

      await client.patch(docId).set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt,
        },
      }).commit()

      console.log(`✓  ${title} → ${asset._id}`)
      uploaded++
    } catch (err) {
      console.error(`✗  ${title}: ${err.message}`)
    }
  }

  console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped.`)
}

run().catch(console.error)
