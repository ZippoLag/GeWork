const { generateSW } = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built

const swDest = 'build/sw.js';

generateSW({
  swDest,
  globDirectory: 'build',
  globPatterns: [
    '**/*.{json,xml,webmanifest,html,js,css,png,gif,jpg,jpeg,webp,svg,ico}'
  ],
  skipWaiting: true,
  clientsClaim: true,
  cacheId: 'GeWorkSW',
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      urlPattern: /api/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'gw-api-cache',
        backgroundSync: {
          name: 'gw-api-sync-queue',
          options: {
            maxRetentionTime: 60
          }
        },
        broadcastUpdate: {
          channelName: 'gw-api-update-channel'
        },
        cacheableResponse: {
          statuses: [0, 200]
        },
        plugins: [
          {
            cacheDidUpdate: () => {
              console.log(
                'Actualizada cache de llamadas API de GW mediante SW..'
              );
            }
          }
        ],
        fetchOptions: {
          mode: 'no-cors'
        },
        matchOptions: {
          ignoreSearch: false
        }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  warnings.forEach(console.warn);
  console.log(
    `Se generó ${swDest}, la cual pre-cacheará ${count} archivos, de ${size}bytes.`
  );
});
