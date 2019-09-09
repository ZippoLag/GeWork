if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );

  //For alternative strategies, check out:
  //https://developers.google.com/web/tools/workbox/guides/common-recipes
  //https://developers.google.com/web/tools/workbox/guides/advanced-recipes

  if (workbox) {
    console.log("Workbox is loaded");

    //Injection point for manifest files
    workbox.precaching.precacheAndRoute([]);

    //custom cache rules
    workbox.routing.registerNavigationRoute("/index.html", {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    });

    //Caching images cache-first with 30 day expiration
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );

    //Caching js and css files with a stale while revalidate strategy
    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "static-resources"
      })
    );

    //Caching API calls with stale while revalidate strategy
    workbox.routing.registerRoute(
      /.*\/api\/.*/,
      new workbox.strategies.CacheFirst({
        cacheName: "api-calls"
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
