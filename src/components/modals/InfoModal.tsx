import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Хайдах оонньоонор" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Таайыллыбыт тылы 6-та холонон көрөн таайын. Хас холонон көрүү кэннэ, буукуба өҥө уларыйыа төһө чугаскытын көрдөрөөрү.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="К" status="correct" />
        <Cell value="Ө" />
        <Cell value="М" />
        <Cell value="Ү" />
        <Cell value="С" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        "К" буукуба тылга баар уонна сөп миэстэҕэ турар.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Б" />
        <Cell value="Ы" />
        <Cell value="Л" status="present" />
        <Cell value="Ы" />
        <Cell value="Т" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        "Л" буукуба тылга баар ол эрэн атын миэстэҕэ туруохтаах.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Х" />
        <Cell value="А" />
        <Cell value="Р" />
        <Cell value="Ч" status="absent" />
        <Cell value="Ы" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        "Ч" буукуба тылга ханна да суох.
      </p>
    </BaseModal>
  )
}
