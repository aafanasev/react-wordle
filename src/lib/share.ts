import { log } from './analytics'
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const tweetStatus = (guesses: string[], lost: boolean) => {
  log('tweet')
  window.open(
    'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(getText(guesses, lost)),
    '_blank'
  )
}

export const vkStatus = (guesses: string[], lost: boolean) => {
  log('vk')
  window.open(
    'https://vk.com/share.php' +
      '?url=' +
      encodeURIComponent(window.location.origin) +
      '&title=' +
      encodeURIComponent(
        `${GAME_TITLE} #буордулу #${solutionIndex} ${getStats(guesses, lost)}`
      ),
    '_blank'
  )
}

export const shareStatus = (guesses: string[], lost: boolean) => {
  log('share')
  navigator.share({
    text: getText(guesses, lost),
  })
}

export const copyStatus = (guesses: string[], lost: boolean) => {
  log('copy')
  navigator.clipboard.writeText(getText(guesses, lost))
}

const getStats = (guesses: string[], lost: boolean) => {
  return `${lost ? 'X' : guesses.length}/6`
}

const getText = (guesses: string[], lost: boolean) => {
  return (
    `${GAME_TITLE} #${solutionIndex} ${getStats(guesses, lost)}\n\n` +
    generateEmojiGrid(guesses) +
    `\n\n#буордулу\n\n${window.location.origin}`
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
