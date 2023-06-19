import type { Config } from 'prismic-ts-codegen'

const config: Config = {
    repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
    output: './prismicio-types.d.ts',
    models: ['./customtypes/**/index.json', './slices/**/model.json'],
}

export default config
