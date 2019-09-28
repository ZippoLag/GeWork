const { generateSW } = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built

const swDest = 'build/sw.js';

//TODO: can we avoid pulluting the console with error messages when a fetch fails? (if it's handled by the SW cache anyway?)
//TODO: investigate channelName
//TODO: keep in mind we may need to revert back to injectManifest approach for working with push notifications

generateSW({
  swDest,
  globDirectory: 'build',
  globPatterns: [
    '**/*.{json,xml,webmanifest,html,js,css,png,gif,jpg,jpeg,webp,svg,ico}'
  ],
  runtimeCaching: [
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: /api/,
      // Apply a network-first strategy.
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'im-api-cache',
        backgroundSync: {
          name: 'im-sync-queue',
          options: {
            maxRetentionTime: 60 * 60
          }
        },
        cacheableResponse: {
          statuses: [0, 200]
        },
        plugins: [
          {
            cacheDidUpdate: () => {
              console.log('WorkBox Cache has been updated.');
            }
          }
        ],
        fetchOptions: {
          mode: 'no-cors'
        },
        matchOptions: {
          ignoreSearch: true
        }
      }
    }
  ]
}).then(({ count, size, warnings }) => {
  // Optionally, log any warnings and details.
  warnings.forEach(console.warn);
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});
