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
    "revision": "278bdfd7fe8140ec26206853cb34b7f9"
  },
  {
    "url": "index.html",
    "revision": "deac2cc3cd34f1c96284322aef955689"
  },
  {
    "url": "static/css/main.e6059d77.chunk.css",
    "revision": "9070cc1c7389fa0a9fac6752b54ccba1"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.e486624b.chunk.js",
    "revision": "0cc4cc00023c63674ff30bc32d3ed7cb"
  },
  {
    "url": "static/js/main.cb07e8cb.chunk.js",
    "revision": "d8990aa61dd36ad1695925646de52ebe"
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
