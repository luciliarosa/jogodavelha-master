# Tic-Tac-Toe

A simple two-player tic-tac-toe game built with HTML, CSS, and vanilla JavaScript. Players enter their names before the match starts, and the game keeps track of wins, losses, and match history across rounds.

## Features

- Name registration screen for both players
- Turn indicator showing whose move it is
- Win detection with highlight on the winning combination
- Draw detection
- Scoreboard with wins per player and total draws
- Match history log
- Option to reset the scoreboard or switch players

## Project structure

```
├── index.html
├── style.css
└── script.js
```

No build tools, no dependencies. Just open `index.html` in a browser and play.

## Live demo

https://jogodavelha-master.vercel.app/

## How to run locally

1. Download or clone the repository
2. Open `index.html` in any modern browser
3. Enter the names of both players and click "Começar"

## How to play

- Players take turns clicking on the board
- The first to get three in a row (horizontally, vertically, or diagonally) wins
- After each match, the scoreboard updates and shows the result
- Click "Jogar de novo" to start a new match without resetting the score
- Click "Zerar placar" to clear all results and start fresh
- Click "Trocar jogadores" to go back to the name registration screen

## Notes

- The X and O symbols are drawn with inline SVG, so no external image files are needed
- The scoreboard and match history are stored in memory and reset when the page is refreshed
- Tested in Chrome, Firefox, and Edge