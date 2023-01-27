import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { GAME_TITLE } from './constants/strings'
import { WORDS } from './constants/wordlist'
import { WORDS as WORDS_5 } from './constants/wordlist_5'
import { VALID_GUESSES } from './constants/validGuesses'
import { VALID_GUESSES as VALID_GUESSES_5 } from './constants/validGuesses_5'

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

test('renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(GAME_TITLE)
  expect(linkElement).toBeInTheDocument()
})

test('keyboard contains all required letters', () => {
  render(<App />)

  const allKeys = new Set(WORDS.flatMap((word) => word.split('')))
  VALID_GUESSES.flatMap((word) => word.split('')).forEach((letter) =>
    allKeys.add(letter)
  )

  const keyboardKeys = new Set()
  const keyboard = screen.getByTestId('keyboard')
  keyboard.querySelectorAll('button').forEach((button) => {
    if (button.textContent?.length == 1) {
      keyboardKeys.add(button.textContent.toLocaleLowerCase())
    }
  })

  expect(Array.from(keyboardKeys).sort()).toStrictEqual(
    Array.from(allKeys).sort()
  )
})

test('no repeated words in wordlist and validGuesses', () => {
  let validGuesses = new Set(VALID_GUESSES)
  WORDS.forEach((word) => {
    expect(validGuesses).not.toContain(word)
  })
})

test('keyboard contains all required letters 5', () => {
  render(<App />)

  const allKeys = new Set(WORDS_5.flatMap((word) => word.split('')))
  VALID_GUESSES_5.flatMap((word) => word.split('')).forEach((letter) =>
    allKeys.add(letter)
  )

  const keyboardKeys = new Set()
  const keyboard = screen.getByTestId('keyboard')
  keyboard.querySelectorAll('button').forEach((button) => {
    if (button.textContent?.length == 1) {
      keyboardKeys.add(button.textContent.toLocaleLowerCase())
    }
  })

  expect(Array.from(keyboardKeys).sort()).toStrictEqual(
    Array.from(allKeys).sort()
  )
})

test('no repeated words in wordlist 5 and validGuesses 5', () => {
  let validGuesses = new Set(VALID_GUESSES_5)
  WORDS_5.forEach((word) => {
    expect(validGuesses).not.toContain(word)
  })
})
