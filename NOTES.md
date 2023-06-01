### Prismic type in generated ts

```` javascript
// @ts-ignore
import type * as prismic from '@prismicio/types'
// eslint-disable-next-line import/named,import/no-named-as-default
import CustomTypesClient, { CustomTypesClientConfig } from '@prismicio/custom-types-client/dist/index'

(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````


### IN PROGRESS
* **(Setup)** pushed slices aren't available in prismic repository (can't display block in home_page)

### TO CHECK
* **(Build)** avoid to generate route for ['/preview', '/en/preview', ''/en/slice-simulator', '/slice-simulator']

### TODOS
* **(Build)** disable google crawl during dev

### DONE
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

### LATER 
* **(Nav && Config)**: Configure nested route
* **(Config)**: I18n
