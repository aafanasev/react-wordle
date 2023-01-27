import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  lettersCount: number
}

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  lettersCount,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className="flex flex-col flex-1 justify-center md:flex-none md:pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} lettersCount={lettersCount} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} lettersCount={lettersCount} />
      ))}
    </div>
  )
}
