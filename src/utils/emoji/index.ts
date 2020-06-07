import { BaseEmoji, emojiIndex } from 'emoji-mart'

export const getEmojiFromColons = (colons: string) => (
  emojiIndex.search(colons.replace(/:/g, ''))![0] as BaseEmoji
).native
