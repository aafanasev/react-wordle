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
  keyboardLayout: string
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  isRevealing,
  keyboardLayout,
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

  const backspace = (
    <Key width={84} value="DELETE" onClick={onClick}>
      <BackspaceIcon className="h-6 w-6" />
    </Key>
  )
  const enter = (
    <Key width={84} value="ENTER" onClick={onClick}>
      <SearchIcon className="h-6 w-6" />
    </Key>
  )

  const lastRowCls = 'flex justify-center mx-1 md:mx-0'
  const rowCls = lastRowCls + ' mb-1'
  const rows = [
    <div className={rowCls} key="row-1">
      {['Й', 'У', 'К', 'Н', 'Г', 'Х', 'Һ', 'Ө', 'Ҕ', 'Ү'].map(createKey)}
    </div>,
  ]

  if (keyboardLayout === 'low_backspace') {
    rows.push(
      <div className={rowCls} key="row-2">
        {['Ы', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Э', 'Б', 'Ҥ'].map(createKey)}
      </div>
    )
    rows.push(
      <div className={lastRowCls} key="row-3">
        {backspace}
        {['Ч', 'С', 'М', 'И', 'Т', 'Ь'].map(createKey)}
        {enter}
      </div>
    )
  } else {
    rows.push(
      <div className={rowCls} key="row-2">
        {['Ы', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Э'].map(createKey)}
        {backspace}
      </div>
    )
    rows.push(
      <div className={lastRowCls} key="row-3">
        {['Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ҥ'].map(createKey)}
        {enter}
      </div>
    )
  }

  return <div data-testid="keyboard">{rows.map((row, _) => row)}</div>
}
