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
-   **KPI Dashboard:** Clear readouts of Total Investment, ROI %, and match frequency (2, 3, or Jackpot).
-   **Responsive Design:** Fully optimized for mobile and desktop using Tailwind CSS v4.
-   **Accessibility:** Built with WAI-ARIA standards for inclusive use.

## 🛠️ Tech Stack

-   **Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Visualization:** [Recharts](https://recharts.org/)
-   **Icons:** [Lucide React](https://lucide.dev/)

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

## 📊 Prize Structure (Simulated)

The simulation uses the following mock payout system:
-   **1 Match:** $0
-   **2 Matches:** $4
-   **3 Matches:** $100
-   **4 Matches (Jackpot):** $20,000
-   *Note: These are for educational visualization purposes.*

## 👤 Author

**Alexandr Lavrentyev**
Software Engineer

-   **Email:** [al3xsus@pm.me](mailto:al3xsus@pm.me)
-   **GitHub:** [@al3xsus](https://github.com/al3xsus/)
-   **LinkedIn:** [Alexandr Lavrentyev](https://www.linkedin.com/in/alexandr-lavrentyev/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
