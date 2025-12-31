# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quadrati Numeri is a browser-based puzzle game where players drag and drop numbered squares to combine them. The goal is to eliminate all squares from the board by matching identical values or strategically combining numbers with operations.

## Development

This is a vanilla HTML/CSS/JS project with no build tools or dependencies. To run locally, open `index.html` in a browser.

## Architecture

**Core Game Mechanics (script.js)**
- Squares can be numbers (SquareType.NUMBER) or operations (SquareType.OPERATION)
- Operations: x2, x3, +- (negate)
- Combining rules:
  - Same value squares → both disappear
  - Number + Number → sum
  - Number + Operation → apply operation to number
  - Operation + Operation → compose (multiply their multipliers)
- Win condition: all squares eliminated

**Game State**
- `gameState` object holds current level, squares array, and drag state
- `levels` array contains 25 predefined puzzle configurations with solutions documented in comments

**UI Components**
- Drag-and-drop with both mouse and touch support
- CSS animations for appear/disappear/merge effects
- Keyboard shortcuts: R (reset), Arrow keys (navigate levels)
