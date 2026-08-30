# 🏆 BloodStrike Tournament Hub

A high-efficiency, tactical esports tournament management web application designed for running live **BloodStrike** competitions. Built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- ⚡ **Dynamic Scoreboard & Live Rankings**
  - Instant calculations for placement points, kill multipliers, and total scores.
  - Interactive round-by-round score entry for active players and squads.
  - Full **Undo / History** stack to correct accidental score inputs seamlessly.

- 🏆 **Hall of Fame (Honor Roll)**
  - Dedicated showcase for past tournament champions and MVPs.
  - Holds historical records for legendary tournament editions (e.g., *Genesis*, *Thousand-Year Blood War*, *Loose Ends*, *The High Table*, *Incursion*).

- ⚙️ **Tournament Configurator**
  - Custom game mode creation (Battle Royale, Squad Deathmatch, custom formats).
  - Map pool rotation manager.
  - Fully customizable scoring rules (points per kill, placement points curve).

- 💾 **Local Cache Persistence & Fail-Safe Reset**
  - Automatically saves active player lists, scores, and configurations to browser `localStorage`.
  - Protection against accidental tab closes or page reloads mid-tournament.
  - Dedicated **Reset Data** action with confirmation modal.

- 🎨 **Tactical Cyberpunk UI**
  - High-contrast, dark-mode aesthetic built for esports broadcasts and live referees.
  - Responsive layout for desktop and mobile displays.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bloodstrike-tournament-hub.git
   cd bloodstrike-tournament-hub
Install dependencies:
code
Bash
npm install
Start the development server:
code
Bash
npm run dev
Build for production:
code
Bash
npm run build
🛠️ Tech Stack
Framework: React 18
Language: TypeScript
Styling: Tailwind CSS
Icons: Lucide React
Build Tool: Vite
