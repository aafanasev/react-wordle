import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT } from '../../constants/strings'
import { BackspaceIcon } from '@heroicons/react/outline'
import { isMetaProperty } from 'typescript'

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
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  const isMobile = window.innerWidth < 440
  const keyHeight = isMobile ? 44 : 58
  const createKey = (key: string) => (
    <Key
      value={key}
      key={key}
      onClick={onClick}
      status={charStatuses[key]}
      isRevealing={isRevealing}
      height={keyHeight}
    />
  )

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  if (isMobile) {
    return (
      <div>
        <div className="flex justify-center mb-1">
          {['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х'].map(
            createKey
          )}
        </div>
        <div className="flex justify-center mb-1">
          {['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'].map(
            createKey
          )}
        </div>
        <div className="flex justify-center mb-1">
          {['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'].map(createKey)}
        </div>
        <div className="flex justify-center">
          <Key width={84} height={keyHeight} value="DELETE" onClick={onClick}>
            <BackspaceIcon className="h-6 w-6" />
          </Key>
          {['Һ', 'Ө', 'Ҕ', 'Ү', 'Ҥ'].map(createKey)}
          <Key width={84} height={keyHeight} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Һ', 'Ө'].map(
          createKey
        )}
      </div>
      <div className="flex justify-center mb-1">
        {['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Ҕ', 'Ү'].map(
          createKey
        )}
      </div>
      <div className="flex justify-center">
        <Key width={54} height={keyHeight} value="DELETE" onClick={onClick}>
          <BackspaceIcon className="h-6 w-6" />
        </Key>
        {['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ҥ'].map(createKey)}
        <Key width={70} height={keyHeight} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
      </div>
    </div>
  )
}
