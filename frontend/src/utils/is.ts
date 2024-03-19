export const supportedMusicFormat = /\.(mp3|wav|ogg|flac|opus)$/i
export const isSupportedMusicFormat = (name) => supportedMusicFormat.test(name)
