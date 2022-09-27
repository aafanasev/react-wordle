import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { TWITTER_URL } from '../../constants/settings'
import { UserGroupIcon, MailIcon } from '@heroicons/react/outline'

type Props = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen py-10 px-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 dark:bg-gray-800">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer dark:stroke-white"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                  <div className="text-left mt-4 text-xs text-gray-500 dark:text-gray-300">
                    <p>
                      <UserGroupIcon className="inline-flex h-4 w-4" /> Атын
                      дьон Твиттерга кыайыылара{' '}
                      <a
                        href={TWITTER_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 dark:text-blue-300"
                      >
                        #буордулу
                      </a>
                    </p>
                    <p className="mt-2">
                      <MailIcon className="inline-flex h-4 w-4" /> Оонньуу
                      оҥорооччулардыын{' '}
                      <a
                        href="https://forms.gle/x1vkMxnebdFLEgwJA"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 dark:text-blue-300"
                      >
                        санааҕытын үллэстиҥ
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
