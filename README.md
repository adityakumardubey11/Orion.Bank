# Kono Banking Application 🏦

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TailwindCSS, Redux, React Query
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Payments**: Razorpay
- **Deployment**: Docker, Vercel/Render/Railway, PM2

## Local Development

### Prerequisites
```bash
npm install -g pm2
# Copy env files
cp .env.example .env
cp .env.example backend/.env
# Edit .env with your values (MongoDB Atlas recommended)
```

### Using Docker (Recommended)
```bash
docker-compose up -d
# Access: http://localhost:3000
# Backend API: http://localhost:8000
# MongoDB: localhost:27017
```

### Manual
```bash
# Backend
cd backend && npm install && npm run dev
# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

## Production Deployment

### Option 1: Docker (Self-hosted/VPS)
```bash
# Build & run
docker-compose -f docker-compose.prod.yml up -d --build
# PM2 (alternative)
cd backend && pm2 start ecosystem.config.js --env production
```

### Option 2: Vercel (Frontend) + Railway (Backend + MongoDB)
1. **Frontend (Vercel)**:
   ```bash
   cd frontend
   vercel env add NEXT_PUBLIC_BASE_URI  # Set to backend Railway URL/api/v1
   vercel --prod
   ```

2. **Backend (Railway)**:
   ```bash
   cd backend
   railway login
   railway new  # Link GitHub repo
   railway env set MONGO_URI=... JWT_SECRET=... FRONTEND_URI=vercel-url
   railway up
   ```

3. **Database**: MongoDB Atlas (connect via Railway addon).

### Option 3: Render.com
- Backend: Web Service (build `npm install && npm run start`)
- Frontend: Static Site (Next.js)
- Postgres/Mongo addon.

## Environment Variables
See `.env.example`. **Required**:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secure random string
- `FRONTEND_URI`: Frontend base URL
- `NEXT_PUBLIC_BASE_URI`: Backend API base (frontend)

## Testing
```bash
npm test  # Add tests later
docker-compose exec backend npm test
```

## Monitoring
- PM2: `pm2 monit`
- Logs: `docker-compose logs -f`

## License
MIT
