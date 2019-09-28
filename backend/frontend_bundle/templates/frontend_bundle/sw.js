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
    "revision": "e3f3d58577404abff963b7453cca6c49"
  },
  {
    "url": "index.html",
    "revision": "5c4de1f66058bddb4832779a719930b6"
  },
  {
    "url": "static/css/main.2cce8147.chunk.css",
    "revision": "3838af8ed5d5def71fd42b2a5afa2f37"
  },
  {
    "url": "static/favicon.ico",
    "revision": "c92b85a5b907c70211f4ec25e29a8c4a"
  },
  {
    "url": "static/js/2.a7061a18.chunk.js",
    "revision": "6a53a04417e35738a85a6bd8025dc9bd"
  },
  {
    "url": "static/js/main.a4b43249.chunk.js",
    "revision": "da476b8d4542cc56cf79e42388933dd3"
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
