import { Cell } from './Cell'

type Props = {
  lettersCount: number
}

export const EmptyRow = ({ lettersCount }: Props) => {
  const emptyCells = Array.from(Array(lettersCount))

  return (
    <div className="flex justify-center mb-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
