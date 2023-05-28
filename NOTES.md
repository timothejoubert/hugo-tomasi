### Prismic type in generated ts

```` javascript
// @ts-ignore
import type * as prismic from '@prismicio/types'
// eslint-disable-next-line import/named,import/no-named-as-default
import CustomTypesClient, { CustomTypesClientConfig } from '@prismicio/custom-types-client/dist/index'

(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````


### IN PROGRESS

### TODOS

### DONE
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
