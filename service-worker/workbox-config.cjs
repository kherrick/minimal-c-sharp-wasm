const WORKBOX_CONFIG_PATH = process.env.WORKBOX_CONFIG_PATH || "/";

module.exports = {
  globDirectory: ".",
  globPatterns: [
    "**/*.{bin,blat,css,dat,dll,html,ico,jpg,js,json,pdb,png,svg,symbols,wasm,webp}",
  ],
  globIgnores: ["**/node_modules/**/*", "**/service-worker.js", "src/**", "**/package.json", "**/package-lock.json"],
  templatedURLs: {
    [`${WORKBOX_CONFIG_PATH}`]: `${new Date()}`,
  },
  swDest: "service-worker.js",
  maximumFileSizeToCacheInBytes: 5000000,
  // Define runtime caching rules.
  runtimeCaching: [
    {
      // Match any request ends with .png, .jpg, etc
      urlPattern:
        /\.(?:bin|blat|css|dat|dll|html|ico|jpg|js|json|pdb|png|svg|symbols|wasm|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        },
        cacheName: "minimal-c-sharp-wasm-cache",
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
    {
      urlPattern: new RegExp('^https://kherrick.github.io/minimal-c-sharp-wasm/.*$'),
      handler: "NetworkFirst",
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        },
        cacheName: "minimal-c-sharp-wasm-cache-extra",
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
  ],
};
