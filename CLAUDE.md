# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the Project

This is a Wordle clone localized for the **Yakut (Sakha) language** (`Сахалыы`). The game picks a daily 5-letter Yakut word and gives players 6 attempts to guess it. The UI strings are in Yakut; the codebase is in TypeScript + React.

## Commands

```bash
npm start          # Dev server
npm test           # Run tests (watch mode by default)
npm run lint       # Check formatting with Prettier
npm run fix        # Auto-fix formatting with Prettier
npm run build      # Production build
npm run pack       # Full release: fix + test + build → output to /docs
```

Run a single test file:
```bash
npm test -- --testPathPattern=App.test
```

## Architecture

All game logic lives in `src/App.tsx` (a single stateful component). There is no Redux or global state management — everything is local React state passed down as props.

**Key data flow:**
- `src/constants/wordlist.ts` — the answer word list (daily word is derived from epoch offset)
- `src/constants/validGuesses.ts` — additional accepted guesses that aren't answers
- `src/lib/words.ts` — `getWordOfDay()` selects today's solution by index from the word list; epoch is January 1, 2022
- `src/lib/statuses.ts` — `getGuessStatuses()` / `getStatuses()` compute per-character `CharStatus` (`absent` | `present` | `correct`)
- `src/lib/stats.ts` + `src/lib/localStorage.ts` — persistence of game state and statistics in `localStorage`
- `src/lib/analytics.ts` — Firebase Analytics wrapper (`log(eventName, params?)`)
- `src/constants/settings.ts` — game constants (`MAX_WORD_LENGTH=5`, `MAX_CHALLENGES=6`, timing values)
- `src/constants/strings.ts` — all UI strings in Yakut; edit here for any copy changes

**Component structure:**
- `Grid` → `CompletedRow` / `CurrentRow` / `EmptyRow` → `Cell` — renders the guess board
- `Keyboard` → `Key` — on-screen keyboard; receives `guesses` to color-code keys
- `InfoModal`, `StatsModal`, `SettingsModal` → `BaseModal` — modal dialogs via `@headlessui/react`
- `Alert` — transient flash messages

**Settings persisted to localStorage:**
- `theme` (`dark` | `light`)
- `keyboard` — keyboard layout (`default` or alternate)

**Deployment:** The production build is committed to `/docs` and served via GitHub Pages. Run `npm run pack` to rebuild it.

## Adding New Words

Edit `src/constants/wordlist.ts` to add answer words and `src/constants/validGuesses.ts` for additional accepted-but-not-answer words. Words must be exactly 5 characters (Yakut alphabet).
