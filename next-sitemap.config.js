/** @type {import('next-sitemap').IConfig} */

// TODO: update sitemap generator(if needed)
// you may need to update which routes are excluded,
// or update the change frequency and priority
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: [
      '/api/*',
      '/admin/*',
      '/404',
      '/500'
    ],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/api/*',
            '/admin/*',
            '/_next/*',
            '/*.json$'
          ]
        }
      ]
    },
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: path === '/' ? 1.0 : config.priority,
        lastmod: new Date().toISOString(),
      }
    }
  }