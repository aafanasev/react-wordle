import { Cell } from './Cell'

type Props = {
  lettersCount: number
  guess: string
}

export const CurrentRow = ({ lettersCount, guess }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(lettersCount - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
