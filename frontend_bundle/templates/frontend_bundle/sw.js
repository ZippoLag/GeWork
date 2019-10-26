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
    "revision": "4e227c97f3223b96226804dddb8efbfc"
  },
  {
    "url": "index.html",
    "revision": "96eea0c02994d712ac429040e0971392"
  },
  {
    "url": "static/css/main.34e9f10f.chunk.css",
    "revision": "80f130ca63c81b1acf79f9137dd4e9ff"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.b9bad26d.chunk.js",
    "revision": "b97c0afab1aa09dcea3bb7b1dcb85611"
  },
  {
    "url": "static/js/main.0b67e530.chunk.js",
    "revision": "a08221309bda7b6d63f885ad641ced99"
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
