jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
process.env.PORT = process.env.PORT || 5060
process.env.NODE_ENV = 'production'

const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')

const config = require('./fixture/nuxt.config')

const url = path => `http://localhost:${process.env.PORT}${path}`
const get = path => request(url(path))

describe('Module', () => {
  let nuxt

  beforeAll(async () => {
    config.modules.unshift(function () {
      // Add test specific test only hooks on nuxt life cycle
    })

    // Build a fresh nuxt
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(process.env.PORT)
  })

  afterAll(async () => {
    // Close all opened resources
    await nuxt.close()
  })

  test('/ contains EN text, link to /fr/ & link /about-us', async () => {
    let html = await get('/')
    expect(html).toContain('Homepage')
    expect(html).toContain('<a href="/fr/">Français</a>')
    expect(html).toContain('<a href="/about-us">About us</a>')
  })

  test('/fr/ contains FR text, link to / & link to /fr/a-propos', async () => {
    let html = await get('/fr/')
    expect(html).toContain('Accueil')
    expect(html).toContain('<a href="/">English</a>')
    expect(html).toContain('<a href="/fr/a-propos">À propos</a>')
  })

  test('/about-us contains EN text, link to /fr/a-propos & link /', async () => {
    let html = await get('/about-us')
    expect(html).toContain('Homepage')
    expect(html).toContain('<a href="/fr/a-propos">Français</a>')
    expect(html).toContain('<a href="/">Homepage</a>')
  })

  test('/fr/a-propos contains FR text, link to /about-us & link to /fr/', async () => {
    let html = await get('/fr/a-propos')
    expect(html).toContain('À propos')
    expect(html).toContain('<a href="/about-us">English</a>')
    expect(html).toContain('<a href="/fr/">Accueil</a>')
  })
})
