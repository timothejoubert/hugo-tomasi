const embedType = {
    vimeo: 'player.vimeo.com/video',
    youtube: 'youtube.com/embed',
} as const

type EmbedPlatform = keyof typeof embedType

export function isEmbedMedia(url: string) {
    return Object.values(embedType).some((embedPattern) => url.includes(embedPattern))
}

export function isEmbedVimeo(url: string) {
    return url.includes(embedType.vimeo)
}

export function isEmbedYoutube(url: string) {
    return url.includes(embedType.youtube)
}
