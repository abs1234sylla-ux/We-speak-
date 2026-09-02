# 🎤 We-speak - Communication en Temps Réel

Une application de communication multi-plateforme moderne construite avec **Abdramane sylla **, **Express**, **Socket.io** et **Capacitor**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)

---

## 📋 Table des Matières

- [Caractéristiques](#caractéristiques)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Build Mobile](#build-mobile)
- [Dépannage](#dépannage)
- [Contribution](#contribution)
- [Licence](#licence)

---

## ✨ Caractéristiques

✅ **Communication en temps réel** avec Socket.io  
✅ **Interface responsive** compatible mobile et desktop  
✅ **Salles de chat** multiples  
✅ **Indicateur de frappe** pour voir quand quelqu'un tape  
✅ **Statut de connexion** en direct  
✅ **Design moderne** avec Tailwind-inspired styling  
✅ **App mobile** via Capacitor (Android/iOS)  
✅ **Sécurisé** avec Helmet.js  
✅ **CORS** activé pour intégrations tierces  

---

## 🚀 Installation

### Prérequis

- **Node.js** v14+ ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn**
- **Git**

### Étapes

1. **Cloner le repository**

```bash
git clone https://github.com/abs1234sylla-ux/We-speak-.git
cd We-speak-
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l'environnement**

```bash
cp .env.example .env
nano .env  # Éditer les variables
```

4. **Démarrer le serveur**

```bash
# Mode développement (avec auto-reload)
npm run dev

# Ou mode production
npm start
```

5. **Accéder à l'application**

Ouvrez votre navigateur et allez à : **http://localhost:3000**

---

## ⚙️ Configuration

### Variables d'Environnement (.env)

```env
# Serveur
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGIN=*

# Socket.io
SOCKET_IO_PATH=/socket.io

# Logging
LOG_LEVEL=debug
```

### Configuration Capacitor (capacitor.config.json)

```json
{
  "appId": "com.wespeak.app",
  "appName": "We-speak",
  "webDir": ".",
  "server": {
    "androidScheme": "https"
  }
}
```

---

## 💬 Utilisation

### Démarrer une Session

1. Ouvrez l'app
2. Entrez votre nom d'utilisateur
3. Cliquez "Continuer"
4. Commencez à chatter !

### API Socket.io

#### Client → Serveur

```javascript
// Rejoindre une salle
socket.emit('join_room', {
  room: 'general',
  username: 'John'
});

// Envoyer un message
socket.emit('send_message', {
  room: 'general',
  message: 'Bonjour !',
  username: 'John'
});

// Quitter une salle
socket.emit('leave_room', {
  room: 'general',
  username: 'John'
});

// Utilisateur en train de taper
socket.emit('user_typing', {
  room: 'general',
  username: 'John'
});
```

#### Serveur → Client

```javascript
// Message reçu
socket.on('receive_message', (data) => {
  console.log(data.user + ': ' + data.message);
});

// Utilisateur a rejoint
socket.on('user_joined', (data) => {
  console.log(data.message);
});

// Utilisateur a quitté
socket.on('user_left', (data) => {
  console.log(data.message);
});

// Utilisateur en train de taper
socket.on('user_typing', (data) => {
  console.log(data.user + ' écrit...');
});
```

### Routes HTTP

```
GET  /              → Interface HTML
GET  /api/health    → Vérifier l'état du serveur
```

---

## 🏗️ Architecture

### Structure du Projet

```
We-speak/
├── index.html              # Frontend (HTML + CSS + JS)
├── server.js               # Backend (Express + Socket.io)
├── package.json            # Dépendances
├── .env.example            # Template variables d'env
├── capacitor.config.json   # Config mobile
├── android-build.md        # Instructions Android
├── README.md               # Ce fichier
└── .gitignore              # Fichiers ignorés Git
```

### Stack Technologique

**Backend:**
- Node.js + Express
- Socket.io (WebSocket)
- Helmet (Sécurité)
- Compression
- CORS

**Frontend:**
- HTML5
- CSS3 (Responsive)
- Vanilla JavaScript
- Socket.io Client

**Mobile:**
- Capacitor
- Android SDK

---

## 📱 Build Mobile

### Pour Android

```bash
# 1. Ajouter Android
npm run cap:add

# 2. Synchroniser
npm run cap:sync

# 3. Build
npm run cap:open android
# Ou directement:
npm run build:mobile

# 4. Installer sur appareil
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Voir [android-build.md](./android-build.md) pour les instructions détaillées.

---

## 🐛 Dépannage

### Serveur ne démarre pas

```bash
# Vérifier les ports utilisés
lsof -i :3000

# Utiliser un autre port
PORT=3001 npm start
```

### Socket.io ne se connecte pas

```javascript
// Vérifier la connexion dans la console
socket.on('connect', () => {
  console.log('Connecté!');
});

socket.on('connect_error', (error) => {
  console.error('Erreur:', error);
});
```

### CORS Error

Assurez-vous que `CORS_ORIGIN` dans `.env` est correct:

```env
CORS_ORIGIN=http://localhost:3000
# Ou pour accepter toutes les origines:
CORS_ORIGIN=*
```

### Messages ne s'affichent pas

1. Vérifier que Socket.io est connecté
2. Vérifier la console du navigateur pour les erreurs
3. Vérifier que l'utilisateur a rejoint la bonne salle
4. Relancer le serveur

---

## 🤝 Contribution

Les contributions sont bienvenues ! 

1. Forkez le repository
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Commitez vos changements (`git commit -m 'Add amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📧 Support

Pour des questions ou des problèmes :
- Ouvrez une [Issue](https://github.com/abs1234sylla-ux/We-speak-/issues)
- Contactez : [abs1234sylla-ux@github.com](mailto:abs1234sylla-ux@example.com)

---

## 🎯 Roadmap

- [ ] Authentification utilisateur
- [ ] Sauvegarde de l'historique des messages
- [ ] Partage de fichiers
- [ ] Appels vocaux/vidéo
- [ ] Notifications push
- [ ] Mode sombre
- [ ] Support multi-langues
- [ ] Dashboard admin

---

## 👏 Remerciements

- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Capacitor](https://capacitorjs.com/)
- [Helmet.js](https://helmetjs.github.io/)

---

**Fabriqué avec ❤️ par [abs1234sylla-ux](https://github.com/abs1234sylla-ux)**
