import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  isDark: boolean
  lettersCount: number
  keyboardLayout: string
  handleDarkMode: (isDark: boolean) => void
  handleLettersCount: (lettersCount: number) => void
  handleKeyboardLayout: (keyboardLayout: string) => void
  handleClose: () => void
}

export const SettingsModal = ({
  isOpen,
  isDark,
  lettersCount,
  keyboardLayout,
  handleDarkMode,
  handleLettersCount,
  handleKeyboardLayout,
  handleClose,
}: Props) => {
  return (
    <BaseModal title="Настройка" isOpen={isOpen} handleClose={handleClose}>
      <div className="text-left mt-4">
        <label
          htmlFor="six-letters-toggle"
          className="relative inline-flex items-center mb-4 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={lettersCount == 6}
            id="six-letters-toggle"
            className="sr-only peer"
            onChange={(e) => handleLettersCount(e.target.checked ? 6 : 5)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-300">
            6 буукубалаах тыллар
          </span>
        </label>
      </div>

      <div className="text-left">
        <label
          htmlFor="dark-theme-toggle"
          className="relative inline-flex items-center mb-4 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={isDark}
            id="dark-theme-toggle"
            className="sr-only peer"
            onChange={(e) => handleDarkMode(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-300">
            Хараҥа дьүһүн
          </span>
        </label>
      </div>

      <div className="text-left">
        <label
          htmlFor="keyboard-layout-toggle"
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={keyboardLayout === 'low_backspace'}
            id="keyboard-layout-toggle"
            className="sr-only peer"
            onChange={(e) =>
              handleKeyboardLayout(
                e.target.checked ? 'low_backspace' : 'default'
              )
            }
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm text-gray-500 dark:text-gray-300">
            Сотор кнопка аллараа
          </span>
        </label>
      </div>
    </BaseModal>
  )
}
