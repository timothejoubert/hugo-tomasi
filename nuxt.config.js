// import { getStoriesPaths } from 'slice-machine-ui/helpers/storybook';
// @ts-ignore
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import sm from './sm.json';
import { version } from './package.json';
import createSitemap from './src/utils/create-sitemap';
import linkResolver from './src/utils/prismic/link-resolver';
import htmlSerializer from './src/utils/prismic/html-serializer';


const isProduction = process.env.NODE_ENV === 'production';
const apiEndpoint = sm.apiEndpoint || process.env.API_ENDPOINT;
const prismicRepoName = process.env.PRISMIC_REPOSITORY_NAME;

const locales = ['en', 'fr']
export const defaultLocale = 'fr'

export default {
  target: 'static',

  srcDir: 'src',

    router: {
        base: process.env.HOME_PATH || '/',
    },

  image: {
    prismic: {}
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_TITLE,
    htmlAttrs: {
      lang: defaultLocale
    },
    meta: [
        { charset: 'utf-8'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1'},
        { hid: 'description', name: 'description', content: 'fallback description in nuxt.config.js'},
        { name: 'format-detection', content: 'telephone=no'},
        { hid: 'version', name: 'version', content: version || ''}
    ],
    link: [
        // favicon
        {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'},
        {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'},
        {rel: 'manifest', href: '/favicon/site.webmanifest'},
        {rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5'}
    ],
    script: [{ src: `https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicRepoName}`, defer: true} ]
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      '@nuxtjs/prismic',
      // https://go.nuxtjs.dev/typescript
      '@nuxt/typescript-build',
      // https://go.nuxtjs.dev/stylelint
      '@nuxtjs/stylelint-module',
      // https://image.nuxtjs.org/getting-started/installation
      '@nuxt/image',
      // https://github.com/nuxt/postcss8
      '@nuxt/postcss8',
      // https://github.com/nuxt-community/svg-module
      '@nuxtjs/svg',
      // https://github.com/nuxt-community/style-resources-module#setup
      '@nuxtjs/style-resources'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
      // https://i18n.nuxtjs.org/
      'nuxt-i18n',
      // https://sitemap.nuxtjs.org/guide/setup
      '@nuxtjs/sitemap'
  ],
  // https://sitemap.nuxtjs.org/guide/setup
  sitemap: {
    hostname: process.env.APP_URL || 'http://localhost:3000',
    // i18n: true,
    path: '/sitemap.xml',
    cacheTime: 1000 * 60 * 60 * 20,
    defaults: {
      changefreq: 'daily',
      lastmod: new Date()
    },
    sitemaps: createSitemap()
  },

    // https://i18n.nuxtjs.org/
    i18n: {
        locales: locales.map((locale) => ({
            code: locale,
            file: `nuxt.${locale}.json`,
        })),
        lazy: true,
        langDir: 'assets/locales/',
        detectBrowserLanguage: false,
        strategy: 'prefix_except_default', // remove url path for default locale
        defaultLocale,
        vuex: false,
        vueI18n: { fallbackLocale: defaultLocale }
    },

  // https://github.com/nuxt-community/svg-module
  svg: {
    svgSpriteLoader: {
      extract: true,
      runtimeGenerator: require.resolve('./src/utils/svg/sprite-component-generator.js'),
      spriteFilename: 'image/sprite.[hash:8].svg'
    }
  },
  // https://nuxtjs.org/deployments/netlify/
  // Redirect to custom Error layout in SPA mode
  generate: {
    fallback: true
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/scss/main'],
  // https://github.com/nuxt-community/style-resources-module#setup
  // can access @include... in all files
  styleResources: {
    scss: ['@/scss/_style-resources.scss'],
    hoistUseStatements: true
  },

    // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms',
  ],

  publicRuntimeConfig: {
    development: process.env.NODE_ENV === 'development',
    appTitle: process.env.APP_TITLE,
    apiUrl: apiEndpoint,
    defaultLocale,
    homePath: process.env.HOME_PATH || '/'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/gsap.client.ts', '~/plugins/prismic-components.ts'],
  prismic: {
    preview: '/preview',
    components: true,
    endpoint: apiEndpoint,
    modern: true,
    linkResolver,
    htmlSerializer
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      css: {
        modules: {
          compileType: 'icss'
        }
      },
      cssModules: {
        modules: {
          localIdentName: isProduction ? '[local]_[hash:base64:5]' : '[name]__[local]--[hash:base64:5]'
        }
      }
    },
    plugins: [new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        id: 'svg-sprite'
      }
    })],
    // fix broken styles during live editing into dev tools https://github.com/vuejs-templates/webpack/issues/1331
    cssSourceMap: false,
    transpile: ['@prismicio/vue', 'gsap', 'vue-slicezone']
  },
  // https://storybook.nuxtjs.org/api/options
  storybook: {
    stories: [
        '~/components/**/*.stories.js',
        '~/stories/**/*.stories.js',
        // './slices/**/*.stories.js',
        // './.slicemachine/assets/**/*.stories.@(js|jsx|ts|tsx|svelte)'
        // ...getStoriesPaths().map(path => path.replace("../", "~/../"))
    ],
    parameters: {
      viewport: {
        viewports: {
          iPhoneSE: {
            name: 'iPhone SE',
            styles: {
              width: '375px',
              height: '660px'
            }
          },
          iPadPortrait: {
            name: 'iPad portrait',
            styles: {
              width: '768px',
              height: '1024px'
            }
          },
          iPadLandscape: {
            name: 'iPad landscape',
            styles: {
              width: '1024px',
              height: '768px'
            }
          }
        }
      }
    },
    addons: [
        {
            name: '@storybook/preset-scss',
            options: {
                cssLoaderOptions: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                },
            },
        },
    ],
  },

  ignore: ['**/*.stories.js']
};
