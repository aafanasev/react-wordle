import { log } from '../../lib/analytics'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { BackspaceIcon, SearchIcon } from '@heroicons/react/outline'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      log('tap_enter')
      onEnter()
    } else if (value === 'DELETE') {
      log('tap_delete')
      onDelete()
    } else {
      onChar(value)
    }
  }

  const createKey = (key: string) => (
    <Key
      value={key}
      key={key}
      onClick={onClick}
      status={charStatuses[key]}
      isRevealing={isRevealing}
    />
  )

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        log('tap_enter_physical')
        onEnter()
      } else if (e.code === 'Backspace') {
        log('tap_delete_physical')
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (
          key.length === 1 &&
          ((key >= 'А' && key <= 'Я') ||
            key === 'Һ' ||
            key === 'Ө' ||
            key === 'Ҕ' ||
            key === '5' ||
            key === 'Ү' ||
            key === 'Ҥ')
        ) {
          log('tap_char_physical')
          onChar(key === '5' ? 'Ҕ' : key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div data-testid="keyboard">
      <div className="flex justify-center mb-1">
        {['Й', 'У', 'К', 'Н', 'Г', 'Х', 'Һ', 'Ө', 'Ҕ', 'Ү'].map(createKey)}
      </div>
      <div className="flex justify-center mb-1">
        {['Ы', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Э'].map(createKey)}
        <Key width={84} value="DELETE" onClick={onClick}>
          <BackspaceIcon className="h-6 w-6" />
        </Key>
      </div>
      <div className="flex justify-center">
        {['Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ҥ'].map(createKey)}
        <Key width={84} value="ENTER" onClick={onClick}>
          <SearchIcon className="h-6 w-6" />
        </Key>
      </div>
    </div>
  )
}
