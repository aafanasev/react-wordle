import { log } from './analytics'
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

// Built as a plain URL rather than opened with window.open so the share control can be a
// real link: iOS only hands x.com over to the X app for genuine <a> taps, and falls back to
// an in-app browser for script-initiated navigation.
export const getXPostUrl = (guesses: string[], lost: boolean) => {
  return (
    'https://x.com/intent/post?text=' +
    encodeURIComponent(getText(guesses, lost))
  )
}

export const logXPost = () => {
  // Event name kept as 'tweet' so existing Firebase reports stay one continuous series.
  log('tweet')
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
