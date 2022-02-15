import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const tweetStatus = (guesses: string[], lost: boolean) => {
  window.open(
    'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(getText(guesses, lost)),
    '_blank'
  )
}

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.share({
    text: getText(guesses, lost),
  })
}

export const copyStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(getText(guesses, lost))
}

const getText = (guesses: string[], lost: boolean) => {
  return (
    `${GAME_TITLE} #${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
    generateEmojiGrid(guesses) +
    `\n\n#буордулу\n\nhttps://wordle.afanasev.net`
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
