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

workbox.core.setCacheNameDetails({prefix: "GeWorkSW"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "1b7f17fa351ef83e7001825d07fce6d6"
  },
  {
    "url": "index.html",
    "revision": "0bebf73d1f1d7b2f1d5c9283e52a3f8d"
  },
  {
    "url": "static/css/main.773572c0.chunk.css",
    "revision": "9b729f1eb9ee1fa973b45c52b02df5e7"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.30cd546b.chunk.js",
    "revision": "997a40ffa8aec271106b03422123784a"
  },
  {
    "url": "static/js/main.cb0f2de2.chunk.js",
    "revision": "2c578cd48bf278b740fbe7bf3cf2316a"
  },
  {
    "url": "static/js/runtime-main.bf0ae59e.js",
    "revision": "e602934f625db50c009c1d3ccbee7361"
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

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/api/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"gw-api-cache","fetchOptions":{"mode":"no-cors"},"matchOptions":{"ignoreSearch":false}, plugins: [{ cacheDidUpdate: () => { console.log( 'Actualizada cache de llamadas API de GW mediante SW..' ); } }, new workbox.backgroundSync.Plugin("gw-api-sync-queue", { maxRetentionTime: 60 }), new workbox.broadcastUpdate.Plugin({ channelName: 'gw-api-update-channel' }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
