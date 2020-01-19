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
    "revision": "b33f6d5d83ea111cb89c562d111378f4"
  },
  {
    "url": "index.html",
    "revision": "bdebce42a9e2945056060594b3a56df7"
  },
  {
    "url": "static/css/main.a3465b1b.chunk.css",
    "revision": "299a410db335f3ef5ae2d26b95907f6c"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.02ce9fea.chunk.js",
    "revision": "95342a01439a178c65562dd1e327dbfe"
  },
  {
    "url": "static/js/main.923d0198.chunk.js",
    "revision": "ad198da0a2241b526c63582917444ca7"
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

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/api/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"gw-api-cache","fetchOptions":{"mode":"no-cors"},"matchOptions":{"ignoreSearch":false}, plugins: [{ cacheDidUpdate: () => { console.log( 'Actualizada cache de llamadas API de GW mediante SW..' ); } }, new workbox.backgroundSync.Plugin("gw-api-sync-queue", { maxRetentionTime: 60 }), new workbox.broadcastUpdate.Plugin({ channelName: 'gw-api-update-channel' }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
