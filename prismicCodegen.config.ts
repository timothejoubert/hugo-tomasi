import type { Config } from "prismic-ts-codegen";

const config: Config = {
    output: "./src/types/prismic/prismic-types.generated.ts",
    models: ["./customtypes/**/index.json"],
};

// default models: ['./customtypes/**/index.json', './slices/**/model.json'],

export default config;

// Loading remote models with the Custom Types API
// https://prismic.io/docs/technical-reference/prismic-ts-codegen
// repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
//     customTypesAPIToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
//     clientIntegration: {
//     includeCreateClientInterface: true,
// },
