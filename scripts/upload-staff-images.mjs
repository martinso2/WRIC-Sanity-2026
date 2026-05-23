/**
 * Uploads staff photos from /public/images/about/ to Sanity
 * and patches each staff document with the image asset reference.
 *
 * Run from the project root:
 *   node scripts/upload-staff-images.mjs
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.join(__dirname, '../frontend/public/images/about')

const TOKEN = 'skfYM2BRsfqgkStaWltyZ2fFuuLB2olVuy3cH9Jh8k3ZYRYWHtl3dKjfcpwZSmJoGaqhjdPUkRiXfeqqcZswkan3jM87UjkvM1a25HlDky0cFAirvu6hA5aXnVg7N9NVw3UCYfsvKj4QylibrGGG7KxdVTrs46QXGlaIXx35qdSBCYxlidWs'

const client = createClient({
  projectId: 'amap9kjd',
  dataset: 'production',
  apiVersion: '2025-09-25',
  token: TOKEN,
  useCdn: false,
})

// Map each staff name to their local image file
const staffImageMap = [
  { name: 'Lil Corcoran',       file: 'who-we-are-18-lilcrop-jpg.jpg' },
  { name: 'Lisa Maurer',        file: 'who-we-are-24-lisa-p-new-jpg.jpg' },
  { name: 'Vidalia Acevedo',    file: 'who-we-are-11-vidaliacrop-jpg.jpg' },
  { name: 'Miriam Bloom',       file: 'who-we-are-23-miriamcrop-jpg.jpg' },
  { name: 'Jenai Bacote',       file: 'who-we-are-04-jenai-pic-new-jpg.jpg' },
  { name: 'Lisa Powers',        file: 'who-we-are-10-lisa3crop-jpg.jpg' },
  { name: 'Helayne Weiss',      file: 'who-we-are-16-weiss-png.png' },
  { name: 'Matilde Villacorta', file: 'who-we-are-12-matilda-new-jpg.jpg' },
  { name: 'Vilma Bustamante',   file: 'who-we-are-02-vilma-pic-1-jpg.jpg' },
  { name: 'Andrei Hushcha',     file: 'who-we-are-05-andrei-jpeg.jpeg' },
  { name: 'Susan Bendes',       file: 'who-we-are-19-susancrop-jpg.jpg' },
  { name: 'Sigrid Ceballos',    file: 'who-we-are-20-sigrid-jpg.jpg' },
  { name: 'Lesley Greenblatt',  file: 'who-we-are-14-leslie-new-jpg.jpg' },
  { name: 'Sarah Bua',          file: 'who-we-are-13-sarah-jpg.jpg' },
  { name: 'Gladis Cuadros',     file: 'who-we-are-03-gladys-jpg.jpg' },
  { name: 'Emily Gonzalez',     file: 'who-we-are-06-emily-jpg.jpg' },
  { name: 'Nikaulys Joaquin',   file: 'who-we-are-22-nikaulis-jpg.jpg' },
]

function mimeType(filename) {
  if (filename.endsWith('.png'))  return 'image/png'
  if (filename.endsWith('.jpeg')) return 'image/jpeg'
  return 'image/jpeg'
}

async function run() {
  // Fetch all staff documents
  const staffDocs = await client.fetch('*[_type == "wricStaffMember"]{ _id, name }')
  const docByName = new Map(staffDocs.map(d => [d.name.toLowerCase().trim(), d._id]))

  let uploaded = 0
  let skipped = 0

  for (const { name, file } of staffImageMap) {
    const imagePath = path.join(IMAGES_DIR, file)
    const docId = docByName.get(name.toLowerCase().trim())

    if (!docId) {
      console.log(`⚠  No Sanity doc found for: ${name}`)
      skipped++
      continue
    }

    if (!existsSync(imagePath)) {
      console.log(`⚠  Image file not found: ${file}`)
      skipped++
      continue
    }

    try {
      // Upload asset
      const asset = await client.assets.upload('image', createReadStream(imagePath), {
        filename: file,
        contentType: mimeType(file),
      })

      // Patch document
      await client
        .patch(docId)
        .set({
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()

      console.log(`✓  ${name} → ${asset._id}`)
      uploaded++
    } catch (err) {
      console.error(`✗  ${name}: ${err.message}`)
    }
  }

  console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped.`)
}

run().catch(console.error)
