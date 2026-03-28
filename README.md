# ourKairos

- `tooling/api-module-template` contains the baseline Express module structure for future API features.
- `docs/api-architecture.md` documents the intended module registration pattern.

The repository includes a framework-agnostic contracts package in `packages/contracts` for request and response payload definitions shared across future apps and services.

## Workspace scripts

- `pnpm check:workspace` validates root workspace files and package manifests.
- `pnpm build` runs the workspace validation baseline.
- `pnpm lint` runs the workspace validation baseline.
- `pnpm typecheck` runs the workspace validation baseline.
- `pnpm test` runs the workspace validation baseline.

The validation script is intentionally non-blocking for an empty workspace so new apps and packages can be added incrementally without breaking `main`.

It reintroduces anticipation to digital communication by combining reliable **Web2 infrastructure** with **blockchain-powered payments**.

Originally built on **Starknet**, ourKairos is actively being **migrated to the Stellar network** to enable faster confirmations, lower transaction costs, and broader accessibility—while preserving a pragmatic hybrid Web2/Web3 architecture.

---

## ✨ Why ourKairos?

In a world dominated by instant messages and disposable content, ourKairos is built around **intentional delivery**.

Capsules are sealed, stored securely, and revealed only when the time is right.

**Use cases include:**

- Future messages to yourself or others
- Birthday and anniversary surprises
- Scheduled video or audio drops
- Crypto gifts delivered at meaningful moments

The platform is designed to work just as well for casual users as it does for crypto-native users, supporting:

- **Guest access**
- **Registered accounts**
- **Subscription-powered perks**

---

## 🚀 Core Features

- **Time-Locked Capsules**  
  Define exactly when a capsule becomes accessible

- **Multi-Media Support**  
  Text, images, videos, and crypto gifts

- **Hybrid Web2 / Web3 Architecture**
  - Web2 for storage, integrity, and performance
  - Web3 for payments, subscriptions, and ownership

- **Flexible Access**  
  Guest users and authenticated accounts

- **Custom Delivery Controls**  
  Recipients, unlock dates, reminders, and visibility

- **Secure & Scalable**  
  Built to grow with usage and contributors

---

## 🏗 Architecture Overview

ourKairos is built as a **modular monorepo** using **Turborepo**, ensuring scalability and clean separation of concerns.

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| **Monorepo**   | Turborepo + pnpm workspaces      |
| **Frontend**   | Next.js (App Router)             |
| **Backend**    | Express.js + TypeScript          |
| **Database**   | MongoDB                          |
| **Blockchain** | Stellar (Payments & Time Bounds) |
| **Services**   | Standalone Node.js workers       |

---

## 📁 Repository Structure

```text
ourKairos/
├── apps/
│   ├── web/        # Next.js frontend application
│   ├── api/        # Express.js backend API
│   └── stellar/    # Stellar payment & verification service
│
├── packages/
│   ├── config/     # Shared TSConfig and ESLint rules
│   ├── types/      # Shared TypeScript interfaces
│   └── utils/      # Shared helper functions
│
├── turbo.json      # Turborepo pipeline configuration
├── package.json
└── README.md
```

---

## 🧰 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm**

  ```bash
  npm install -g pnpm
  ```

- **MongoDB** (local or Atlas)

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/ourKairos.git
   cd ourKairos
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env` file in `apps/api/`:

   ```env
   MONGO_URI=mongodb://localhost:27017/ourkairos
   PORT=3001
   ```

---

### ▶️ Run Locally

Start the full stack (Frontend, API, and Stellar service):

```bash
pnpm dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **API:** [http://localhost:3001](http://localhost:3001)
- **Stellar Service:** Background worker

---

### 🏗 Build for Production

```bash
pnpm build
```

---

## 🔌 API Highlights

### Capsules

- `POST /capsules` — Create a new capsule
- `GET /capsules/:id` — Retrieve capsule details
- `PATCH /capsules/:id` — Seal or update a capsule

### System

- `GET /health` — API & database health check

---

## 🤝 Contributing

ourKairos is fully open-source and welcomes contributors across **Web2**, **Web3**, and **product engineering**.

### How to Contribute

1. Fork the repository
2. Create a feature branch from `main`
3. Pick an open issue or propose a new one
4. Keep pull requests focused and well-documented
5. **Always run `pnpm dev` before submitting**

### Contribution Guidelines

- **Shared Logic:** Place reusable logic in `packages/`
- **Types:** Define all data models in `packages/types`
- **Linting:** Run `pnpm lint` before pushing

---

## Reference templates

The repository includes merge-safe Express observability templates in `tooling/express-observability-template`.

### Resources

- [Figma: ](https://www.figma.com/design/3OcC5Evm7nKmM5FSWrPYZZ/Ourkairos?node-id=0-1&t=7SkdNDM1RezCMz13-1)

## 💬 Support & Community

For questions, design discussions, or pre-PR clarifications:

👉 **Telegram:** [https://t.me/ourKairos](https://t.me/ourKairos)

---

## 📄 License

MIT License
