### SETUP

* Clone skeleton project (Nuxt | Prismic starter)[https://github.com/timothejoubert/nuxt-prismic-skeleton] 
* Update .env file from .sample.env (PRISMIC_REPOSITORY_NAME)
* Init Slice machine (npx @slicemachine/init@latest --repository [repo-name])
* Push on github repo
* Sync slice_model data on prismic repo  


### WEBHOOK
* send prismic webhook to netlify (Prismic tuto)[https://prismic.io/docs/webhooks] | (Netlify build hook page)[https://app.netlify.com/sites/hugo-tomasi/settings/deploys#build-hooks]


### PREVIEW
* Add the cdn preview link in nuxt.config.js
* Setup prismic preview (add name, domain and path to the preview in prismic settings)
