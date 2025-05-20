# AI Agent Marketplace

**AI-powered agent platform with real-time execution, workspace management, and Stripe-based access control. Built with Next.js, Express, Supabase, MongoDB, and BullMQ.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)  
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)  
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)  
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)  
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)  
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)  
[![Stripe](https://img.shields.io/badge/Stripe-6772E5?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)  
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## 🚀 Watch the demo on YouTube

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/seclyxy1ogA/0.jpg)](https://www.youtube.com/watch?v=seclyxy1ogA)


---

## Features

- Purchase-gated AI agents with Stripe Checkout integration  
- Agent execution via GPT-4 or custom LLM endpoints  
- Workspace system: Add/remove agents to a personal workspace  
- Run logging and token gating (one-time access per purchase)  
- Admin dashboard for creators to manage agent data  
- Background processing with BullMQ (Redis-based)  
- Responsive UI with Tailwind CSS and dark mode toggle  

---

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS  
- **Backend**: Express, Node.js  
- **Database**: MongoDB + Mongoose  
- **Queue**: BullMQ + Redis  
- **Auth**: Supabase Auth  
- **Payments**: Stripe Checkout + Webhooks  
- **Deployment**: Render / Docker (locally)  
- **CI/CD**: GitHub Actions  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- Docker & Docker Compose  
- Supabase project (for auth)  
- Stripe account + API keys  

### Installation

```bash
git clone https://github.com/rahilshah105/ai-agent-platform.git
cd ai-agent-platform
npm install
```

### Running the App

```bash
# Start backend (Express) and frontend (Next.js) with Docker
docker-compose up --build

# OR run them separately
npm run dev       # frontend
cd server && npm run dev   # backend
```

---

## Deployment

- Push to GitHub  
- Deploy backend to Render / Railway / AWS (Node.js)  
- Deploy frontend to Vercel / Netlify  
- Use Stripe Webhooks for purchase validation  
- Connect to a production MongoDB + Redis instance (e.g., Atlas + Upstash)

---

## Contributing

1. Fork the repo  
2. Create a branch: `git checkout -b feature/YourFeature`  
3. Commit changes: `git commit -m "Add feature"`  
4. Push: `git push origin feature/YourFeature`  
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

🌐 **Portfolio**: [https://rahilshah.com](https://rahilshah.com)  
🐙 **GitHub**: [https://github.com/rahilshah105](https://github.com/rahilshah105)  
✉️ **Email**: [superrahil10@gmail.com](mailto:superrahil10@gmail.com)
