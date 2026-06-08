# MMM Medical Store

<div align="center">

![Repo](https://img.shields.io/badge/Monorepo-Frontend%20%2B%20Backend-0f172a?style=for-the-badge&logo=github&logoColor=ffffff)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-0ea5e9?style=for-the-badge&logo=react&logoColor=ffffff)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-14b8a6?style=for-the-badge&logo=node.js&logoColor=ffffff)
![Database](https://img.shields.io/badge/Database-MongoDB-16a34a?style=for-the-badge&logo=mongodb&logoColor=ffffff)
![Payments](https://img.shields.io/badge/Payments-Razorpay-111827?style=for-the-badge&logo=razorpay&logoColor=ffffff)

</div>

> Modern full-stack medical store and pharmacy e-commerce monorepo supporting product browsing, prescription uploads, cart flow, and online payments.

## Highlights

- Fast React + Vite frontend with Tailwind CSS
- Node.js + Express API server with Mongoose models
- Prescription upload flow and cart/checkout with Razorpay
- Cloudinary for media, Firebase Admin for notifications, Redis for caching

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, Cloudinary, Firebase Admin, Redis, Razorpay
- Tooling: GitHub Actions, EmailJS

## Repository Layout

See the two main workspaces:

```
mmm-medical-shop/
├── backend/   # API server, models, controllers, routes
└── frontend/  # React + Vite single-page app
```

## Quick Start

Prerequisites: Node.js 18+ (LTS), npm, MongoDB (or Atlas).

### Frontend (development)

```bash
cd frontend
npm install
cp .env.example .env   # update EmailJS / public keys as needed
npm run dev
```

Build for production:

```bash
cd frontend
npm run build
```

### Backend (development)

```bash
cd backend
npm install
cp .env.example .env   # populate DB, Cloudinary, Firebase, Razorpay secrets
npm run dev            # uses nodemon if available
```

Start production server (example):

```bash
cd backend
npm start
```

## Environment Variables

- `frontend/.env` — EmailJS and any public keys used by the client
- `backend/.env` — MongoDB connection string, Cloudinary, Firebase service account, Razorpay keys, Redis URL, JWT secrets

Provide values using the `.env.example` files in each workspace.

## Deployment

- Frontend: built from `frontend/` and can be deployed to static hosts (GitHub Pages, Netlify, Vercel).
- Backend: deploy the `backend/` app to a Node-capable host (Heroku, Render, DigitalOcean App Platform, etc.).

## Notes

- See [frontend/FRONTEND_README.md](frontend/FRONTEND_README.md) for detailed frontend information.
- This repository contains sensitive configuration placeholders; do not commit real secrets.

## License

Proprietary — all rights reserved unless a license is added.
