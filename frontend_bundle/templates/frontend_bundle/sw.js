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
    "revision": "728fbd23c2f9180eda3fbbaa5a3b4d4f"
  },
  {
    "url": "index.html",
    "revision": "8e2d95251179188f8389229ec67d72e3"
  },
  {
    "url": "static/css/2.0f801562.chunk.css",
    "revision": "e6edf6c688779eedde81fa7747974bf3"
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
    "url": "static/js/2.d5c59483.chunk.js",
    "revision": "9f8e05bac6582585465d62ec5e028861"
  },
  {
    "url": "static/js/main.2f3bcf20.chunk.js",
    "revision": "a9bc27a9a339a48cfc202c27e3ffa34b"
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
  },
  {
    "url": "static/media/notification.5bee74ca.svg",
    "revision": "5bee74caefdf9d0a834915f6c8eeb259"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/api/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"gw-api-cache","fetchOptions":{"mode":"no-cors"},"matchOptions":{"ignoreSearch":false}, plugins: [{ cacheDidUpdate: () => { console.log( 'Actualizada cache de llamadas API de GW mediante SW..' ); } }, new workbox.backgroundSync.Plugin("gw-api-sync-queue", { maxRetentionTime: 60 }), new workbox.broadcastUpdate.Plugin({ channelName: 'gw-api-update-channel' }), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');
