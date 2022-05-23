import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { tweetStatus, vkStatus, shareStatus, copyStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  GlobeIcon,
  GlobeAltIcon,
  ShareIcon,
  DuplicateIcon,
} from '@heroicons/react/outline'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  TWITTER_TEXT,
  VK_TEXT,
  SHARE_TEXT,
  COPY_TEXT,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleCopy: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleCopy,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 dark:text-white flex flex-col sm:flex-row">
          <div className="flex flex-col sm:pr-7 self-center">
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div className="flex flex-col sm:w-1/2">
            <h5>Дьоҥҥо кэпсээ #буордулу</h5>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 inline-flex items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm bg-sky-600 hover:bg-sky-700 focus:ring-sky-500"
              onClick={() => {
                tweetStatus(guesses, isGameLost)
              }}
            >
              <GlobeIcon className="h-5 w-5 mr-2" />
              {TWITTER_TEXT}
            </button>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 inline-flex items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              onClick={() => {
                vkStatus(guesses, isGameLost)
              }}
            >
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              {VK_TEXT}
            </button>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 inline-flex items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              onClick={() => {
                shareStatus(guesses, isGameLost)
              }}
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              {SHARE_TEXT}
            </button>
            <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 inline-flex items-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm bg-green-600 hover:bg-green-700 focus:ring-green-500"
              onClick={() => {
                copyStatus(guesses, isGameLost)
                handleCopy()
              }}
            >
              <DuplicateIcon className="h-5 w-5 mr-2" />
              {COPY_TEXT}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  )
}
