### Prismic type in generated ts

```` javascript
import type * as prismicT from "@prismicio/types";
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````


### IN PROGRESS
* **(VLink)** Check component with prismic document
* **(Setup)** Check if ld+json is correct [ref](https://jsonld.com/person/)
* **(Style)** typography mixin
* **(VNav)** when sub page (projects/slug) menu url keep '/project/uid-page'

### TODOS
* **(Internalization)** refetch project with current locale
* **(Config)**: I18n
* **(Nav && Config)**: Configure nested route

### DONE
* **(Setup)** Fix generated prismic ts 
* **(Internalization)** Set Fr as Default
* **(PageComponent)** ProjectPage | HomePage | DefaultPage
* **(Routing)** nestedRoute doesn't redirect to DefaultPage (ex: project/uid looking for project folder)

### ABANDONED
* **(Setup)** Add storybook
