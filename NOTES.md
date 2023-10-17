### Prismic type in generated ts

```` javascript
import type * as prismic from '@prismicio/types'
import { ApiOptions } from '@prismicio/client/types/Api'
import { Document } from '@prismicio/client/types/documents'

(repositoryNameOrEndpoint: string, options?: ApiOptions): Promise<Document<AllDocumentTypes>>
````


### IN PROGRESS
* **(Preview)** not working
* **(Integration)** Responsive
* **(VMarquee)** glitch
* **(Carousel)** drag ghost on firefox && avoid click listener on mouseUp after drag 

### TO CHECK
* **(Build)** Generate.exclude not working
* **(Sitemap && routes)** avoid to generate route for ['/preview', '/en/preview', '/en/slice-simulator', '/slice-simulator']

### TODOS
* **(VCarousel)** scale down on mouse pressed 
* **(ProjectsCarousel)** filter current project after transition done
* **(Transition)** Page transition
* **(VMedia)** allow embed media

### DONE
* **(VDirective)** appear animation & parallaxe
* **(About)** copy email
* **(Component)** VMediaViewer (just play in fullScreen with controls for showreel ?)
* **(VButton)** add cool hover
* **(Component)** About page
* **(VMarquee)** define lines
* **(Bug)** VCarousel => avoid link on mouseUp
* **(Component)** VSplashScreen
* **(VSplashScreen)** Load only one time | also when locale switched => set in session storage
* **(Build)** update share img && favicon
* **(Locale)** check if all link are localised (project link in projectListing aren't)
* **(Build)** disable google crawl during dev
* **(VProjectListing)** update queryParams when update filters
* **(Setup)** prismic linked to skeleton repository
* **(VImage)** add padding bottom depending on ratio to avoid layout shifting when image isn't load yet
* **(VHeaderProject)** add link to tag into projectListing with queryParams url
* **(I18n)** get locale trad
* **(VNav)** when sub page (projects/slug) menu url keep '/project/uid-page'
* **(Internalization)** re fetch project with current locale
* **(VNav)** when switch lang => go to current page
* **(Config)** esLint and styleLint on save
* **(Internalization)** update nav link if locale is 'en' => /en/projects (actually: /projects)
* **(VLink)** Check component with prismic document
* **(Setup)** Check if ld+json is correct [ref](https://jsonld.com/person/)
* **(Style)** typography mixin
* **(Setup)** Fix generated prismic ts 
* **(Internalization)** Set Fr as Default
* **(PageComponent)** ProjectPage | HomePage | DefaultPage
* **(Routing)** nestedRoute doesn't redirect to DefaultPage (ex: project/uid looking for project folder)

### ABANDONED
* **(Setup)** Add storybook
* **(Config)** use PrismicClient (exemple)[https://community.prismic.io/t/an-invalid-prismic-repository-name-was-given/10523/10]

### LATER 
* **(Config)** check if I can make Internalization route path (update documentUid vars by currentLocale ?)
* **(Prismic)** use new Page type
* **(Nav)**: Configure nested route
* **(Config)**: I18n
