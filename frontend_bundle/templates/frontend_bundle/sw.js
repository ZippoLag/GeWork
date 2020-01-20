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
    "revision": "68fea23ddbd5a790f106fbd2f3a32866"
  },
  {
    "url": "index.html",
    "revision": "bafe389b085fbcb864b34dbdd19f491c"
  },
  {
    "url": "static/css/main.f7bc9750.chunk.css",
    "revision": "bb942239fb3003722982436bfcde51a0"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.0e33e0fe.chunk.js",
    "revision": "8f2f13a5e59ff8176dcfc5bf47ec57c5"
  },
  {
    "url": "static/js/main.3c014bdb.chunk.js",
    "revision": "f4e795b01c4106565afb927d9b493b76"
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
