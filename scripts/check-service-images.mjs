import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'amap9kjd', dataset: 'production', apiVersion: '2025-09-25',
  token: 'skfYM2BRsfqgkStaWltyZ2fFuuLB2olVuy3cH9Jh8k3ZYRYWHtl3dKjfcpwZSmJoGaqhjdPUkRiXfeqqcZswkan3jM87UjkvM1a25HlDky0cFAirvu6hA5aXnVg7N9NVw3UCYfsvKj4QylibrGGG7KxdVTrs46QXGlaIXx35qdSBCYxlidWs',
  useCdn: false
})

const r = await client.fetch(`*[_type == "wricService"] | order(order asc) { title, "imageUrl": image.asset->url }`)
console.log(JSON.stringify(r, null, 2))
