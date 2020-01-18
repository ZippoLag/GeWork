/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "11c8917a7dcdbff3c18b3a0bcba63fc8"
  },
  {
    "url": "index.html",
    "revision": "597c4328ad4dcc73123e42c78a01e0c5"
  },
  {
    "url": "static/css/main.57e7eda9.chunk.css",
    "revision": "42e1c1898f58de1307f8a3bd631ddc2d"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.35c82e19.chunk.js",
    "revision": "6f529be8872bd62ebe472efbf70c0df3"
  },
  {
    "url": "static/js/main.731c3a59.chunk.js",
    "revision": "ebcdc9b74fd78e8d3fb0aa67f60fdffe"
  },
  {
    "url": "static/js/runtime~main.760faad6.js",
    "revision": "05275b6a840c0574ca6c90a6ec280d5c"
  },
  {
    "url": "static/logo192.png",
    "revision": "33dbdd0177549353eeeb785d02c294af"
  },
  {
    "url": "static/logo512.png",
    "revision": "917515db74ea8d1aee6a246cfbcc0b45"
  },
  {
    "url": "static/manifest.json",
    "revision": "197a58822bbfeb45c1dfc668e9d6fe26"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/api/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"im-api-cache","fetchOptions":{"mode":"no-cors"},"matchOptions":{"ignoreSearch":true}, plugins: [{ cacheDidUpdate: () => { console.log('WorkBox Cache has been updated.'); } }, new workbox.backgroundSync.Plugin("im-sync-queue", { maxRetentionTime: 3600 }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
