require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialiser Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

// Middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes de base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// Socket.io - Gestion des connexions
io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] Nouvelle connexion: ${socket.id}`);

  // Événement: rejoindre une salle
  socket.on('join_room', (data) => {
    socket.join(data.room);
    console.log(`Utilisateur ${socket.id} a rejoint la salle ${data.room}`);
    
    io.to(data.room).emit('user_joined', {
      message: `${data.username} a rejoint la salle`,
      user: data.username,
      timestamp: new Date().toISOString()
    });
  });

  // Événement: envoyer un message
  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', {
      message: data.message,
      user: data.username,
      timestamp: new Date().toISOString(),
      socketId: socket.id
    });
    console.log(`Message de ${data.username}: ${data.message}`);
  });

  // Événement: quitter une salle
  socket.on('leave_room', (data) => {
    socket.leave(data.room);
    console.log(`Utilisateur ${socket.id} a quitté la salle ${data.room}`);
    
    io.to(data.room).emit('user_left', {
      message: `${data.username} a quitté la salle`,
      user: data.username,
      timestamp: new Date().toISOString()
    });
  });

  // Événement: utilisateur digitant
  socket.on('user_typing', (data) => {
    io.to(data.room).emit('user_typing', {
      user: data.username,
      timestamp: new Date().toISOString()
    });
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log(`[${new Date().toISOString()}] Déconnexion: ${socket.id}`);
  });

  // Gestion des erreurs
  socket.on('error', (error) => {
    console.error(`Erreur Socket.io [${socket.id}]:`, error);
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.path 
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Erreur interne du serveur',
    environment: NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║        🎤 WE-SPEAK SERVER 🎤         ║
╚═══════════════════════════════════════╝

📡 Serveur lancé sur: http://localhost:${PORT}
🌍 Environnement: ${NODE_ENV}
🔌 Socket.io activé
⏰ Démarré le: ${new Date().toISOString()}

Appuyez sur Ctrl+C pour arrêter le serveur
  `);
});

// Gestion des signaux de fermeture
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Fermeture du serveur...');
  server.close(() => {
    console.log('Serveur fermé');
    process.exit(0);
  });
});

module.exports = { app, server, io };
