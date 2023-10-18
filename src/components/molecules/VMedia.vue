<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode, VNodeData } from 'vue'
import VVideo, { VVideoProps } from '~/components/molecules/VVideo.vue'
import { isImage, isVideo } from '~/utils/prismic/media'
import { PrismicMedia } from '~/types/prismic/app-prismic'
import VImage, { VImageProps } from '~/components/molecules/VImage.vue'
import { isEmbedMedia } from '~/utils/media'

export default Vue.extend({
    name: 'VMedia',
    functional: true,
    props: {
        document: Object as PropType<PrismicMedia>,
        video: Object as PropType<Omit<VVideoProps, 'prismicMedia'>>,
        image: Object as PropType<VImageProps>,
        url: String,
    },
    render(createElement, context): VNode {
        const { props } = context
        const { document, url } = props
        if (!document) return createElement('')

        const data: VNodeData = {
            ...context.data,
            class: context.data.class,
            props: context.props,
        }

        const isEmbed = url && isEmbedMedia(url)
        const isVideoMedia = isEmbed || isVideo(document)
        const tag = isVideoMedia ? VVideo : isImage(document) ? VImage : ''

        if (isVideoMedia) {
            data.props = {
                ...data.props,
                ...props.video,
                prismicMedia: document,
            }
            if (isEmbed) Object.assign(data.props, { embedUrl: url })
        } else if (isImage(document)) {
            data.props = {
                ...props.image,
                prismicImage: document,
            }
        }

        return createElement(tag, data, context.slots()?.default)
    },
})
</script>
