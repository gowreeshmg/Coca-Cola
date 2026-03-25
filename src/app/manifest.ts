import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Coca-Cola 3D Experience',
    short_name: 'Coke 3D',
    description: 'A hyper-realistic Coca-Cola landing page',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#F40009',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
