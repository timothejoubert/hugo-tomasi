### Prismic type in generated ts

```` javascript
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````

* **(Setup)** Add storybook
* **(Internalization)** Set Fr as Default
  locale: [Forum](https://community.prismic.io/t/changing-the-main-locale-language/1010)
* **(Config)**: I18n
* **(Nav && Config)**: Configure nested route

CustomType:

- CustomPage [type: Sketchbooks | ProjectList | About]
- ProjectPage
- DefaultPage [Contact | Informations | Awwwards]: isHomePage(boolean)
- CommonContent [Menu | socials | siteInfo]

Tab for page  metaData
