import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Box, Text, Flex } from 'rebass'
import { emojiIndex, Emoji, Picker, BaseEmoji } from 'emoji-mart'
import { theme } from '@/components/Layout/theme'

type TProps = {
  onEmojiSelected: (emoji: BaseEmoji) => void
}

export const EmojiPicker = ({ onEmojiSelected }: TProps) => {
  const [randomEmoji, setRandomEmoji] = useState<BaseEmoji | undefined>(undefined)

  const [showPicker, setShowPicker] = useState(false)

  const [emoji, setEmoji] = useState<BaseEmoji | null>(null)

  const handleShowPicker = useCallback(() => setShowPicker(!showPicker), [])

  const handleChooseEmoji = useCallback((selectedEmoji: BaseEmoji) => {
    setShowPicker(false)
    setEmoji(selectedEmoji)
    onEmojiSelected(selectedEmoji)
  }, [onEmojiSelected])

  useEffect(() => {
    const allEmoji = Object.values(emojiIndex.emojis)
    const randomNumber = Math.floor(Math.random() * allEmoji.length)
    const selectedEmoji = allEmoji[randomNumber] as BaseEmoji

    setRandomEmoji(selectedEmoji)
    onEmojiSelected(selectedEmoji)
  }, [])

  if (!randomEmoji) {
    return null
  }

  return (
    <Box style={{ position: 'relative'}}>
      <Flex
        onClick={handleShowPicker}
        style={{ cursor: 'pointer' }}
        width={40}
        justifyContent="center"
      >
        {emoji
          ? <Emoji emoji={emoji} size={24} />
          : <Text fontSize={3} fontWeight="bold">{randomEmoji.native}</Text>
        }
      </Flex>

      <Box style={{ position: 'absolute', top: '100%', left: '0' }} mt={3}>
        {showPicker && (
          <Picker
            color={theme.colors.primary}
            emoji="otter"
            onSelect={handleChooseEmoji}
            set="apple"
            title=""
            showPreview={false}
            showSkinTones={false}
            emojiTooltip
            defaultSkin={3}
          />
        )}
      </Box>
    </Box>
  )
}
