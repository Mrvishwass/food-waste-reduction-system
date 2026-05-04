require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// ── Route imports ─────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const requestRoutes = require('./routes/requestRoutes');
const profileRoutes = require('./routes/profileRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// ── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS — allow React frontend ───────────────────────────────────────────────
const corsOptions = {
  origin: [
    'http://localhost:5173',   // Vite dev
    'http://localhost:3000',   // CRA dev
    'http://localhost:4173',   // Vite preview
    process.env.FRONTEND_URL,  // Production frontend
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ── Request logger (dev) ──────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🌿 FoodShare API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      food: '/api/food',
      requests: '/api/request',
      profile: '/api/profile',
      payment: '/api/payment',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/payment', paymentRoutes);

// ── 404 & error handlers (must be last) ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🌿  FoodShare API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🚀  Running on    : http://localhost:${PORT}
  🌍  Environment   : ${process.env.NODE_ENV || 'development'}
  🕐  Started at    : ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  API Endpoints:
  POST   /api/auth/register
  POST   /api/auth/login
  GET    /api/auth/me
  GET    /api/food/all
  POST   /api/food/add
  GET    /api/food/:id
  DELETE /api/food/:id
  POST   /api/request/create
  GET    /api/request/my
  GET    /api/request/incoming
  GET    /api/profile
  PUT    /api/profile/update
  POST   /api/payment/process
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('\n⚠️   SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅  Server closed. Bye!\n');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason) => {
  console.error('❌  Unhandled Promise Rejection:', reason);
  server.close(() => process.exit(1));
});
