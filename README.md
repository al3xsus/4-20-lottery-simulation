# Lottery Strategy Sandbox: 4-out-of-20 Simulator

An interactive, high-performance **Lottery Data Simulator & Strategy Sandbox** designed to visualize the mathematical reality of lottery odds through multi-year Monte Carlo simulations.

[![Deploy to GitHub Pages](https://github.com/al3xsus/react-4-out-of-20/actions/workflows/deploy.yml/badge.svg)](https://github.com/al3xsus/react-4-out-of-20/actions/workflows/deploy.yml)

## 🎯 Overview

This project refactors a static lottery mockup into a robust simulation tool. It allows users to pick their "lucky" numbers and instantly see how those numbers would perform over up to 50 years of draws. The simulator runs completely client-side using Web Workers to ensure a smooth, non-blocking UI experience even during thousands of iterations.

**Live Demo:** [https://al3xsus.github.io/react-4-out-of-20/](https://al3xsus.github.io/react-4-out-of-20/)

## ✨ Key Features

-   **Interactive Grid:** Modern 4-out-of-20 number selection interface.
-   **Monte Carlo Engine:** Non-blocking simulation running in a dedicated Web Worker.
-   **Real-time Animation:** Watch your "Net Balance" line evolve week-by-week.
-   **KPI Dashboard:** Clear readouts of Total Investment, Net ROI %, and match frequency (2, 3, or Jackpot).
-   **Responsive Design:** Fully optimized for mobile and desktop using Tailwind CSS v4.
-   **Accessibility:** Built with WAI-ARIA standards for inclusive use.

## 🛠️ Tech Stack

-   **Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Visualization:** [Recharts](https://recharts.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🧠 How It Works

The Lottery Strategy Sandbox is built on three core pillars:

### 1. The Monte Carlo Engine
The heart of the application is a Monte Carlo simulation engine. When you click "Run Simulation," the app generates thousands of random sets of 4 numbers (representing the "official draws"). It compares each draw against your selected numbers and calculates winnings based on the prize structure.

This approach allows us to model complex probability outcomes through brute-force computation, providing a realistic look at how "luck" averages out over time.

### 2. Non-Blocking Web Workers
Simulating 50 years of draws (up to 2,600 individual loops) involves significant computation. To prevent the user interface from freezing, the entire simulation is offloaded to a **Web Worker**.

-   **UI Thread:** Handles user interactions, number picking, and rendering the chart.
-   **Worker Thread:** Handles the heavy lifting of generating random numbers and calculating math.
-   **Communication:** The worker sends "Progress Batches" back to the UI thread every simulated "year" (52 draws), allowing the app to update the chart in real-time.

### 3. Streaming Animation Logic
To make the data meaningful, the results aren't just shown instantly. The Web Worker includes a pacing mechanism that sends data in chunks with a slight delay. This creates a "streaming" effect where the user can watch their net balance fluctuate and, inevitably, trend downwards as the "house edge" and mathematical reality take over.

## 📊 Prize Structure (Simulated)

The simulation uses the following mock payout system:
-   **1 Match:** $0
-   **2 Matches:** $4
-   **3 Matches:** $100
-   **4 Matches (Jackpot):** $20,000
-   *Note: ROI is calculated as `(Winnings - Cost) / Cost`, which in a 4/20 lottery is almost always heavily negative (e.g., -90% or lower).*

## 🚀 Getting Started

### Prerequisites

-   Node.js (Latest LTS recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/al3xsus/react-4-out-of-20.git
    cd react-4-out-of-20
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## 👤 Author

**Alexandr Lavrentyev**
Software Engineer

-   **Email:** [al3xsus@pm.me](mailto:al3xsus@pm.me)
-   **GitHub:** [@al3xsus](https://github.com/al3xsus/)
-   **LinkedIn:** [Alexandr Lavrentyev](https://www.linkedin.com/in/alexandr-lavrentyev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
