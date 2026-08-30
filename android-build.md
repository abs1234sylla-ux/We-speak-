# 🚀 Guide de Build Android - We-speak

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v14+) et **npm**
- **Java Development Kit (JDK)** 11+ ([Télécharger](https://www.oracle.com/java/technologies/downloads/))
- **Android SDK** et **Android Studio** ([Télécharger](https://developer.android.com/studio))
- **Capacitor CLI** : `npm install -g @capacitor/cli`

## Vérifier l'Installation

```bash
# Vérifier Java
java -version

# Vérifier Android SDK
echo $ANDROID_SDK_ROOT  # Doit afficher le chemin SDK

# Vérifier Capacitor
capacitor --version
```

---

## 📋 Étapes de Configuration

### 1️⃣ Installation des Dépendances

```bash
# À la racine du projet
npm install
```

### 2️⃣ Ajouter la Plateforme Android

Si c'est la première fois :

```bash
capacitor add android
```

### 3️⃣ Synchroniser les Fichiers

```bash
# Mettre à jour les fichiers Android avec la dernière version du code
capacitor sync android
```

---

## 🔨 Build & Déploiement

### Option 1 : Via Capacitor CLI (Recommandé)

#### Build APK (Débogage)

```bash
# Build en mode débogage
capacitor build android

# Ou directement avec Gradle
cd android
./gradlew assembleDebug
cd ..
```

L'APK sera généré dans : `android/app/build/outputs/apk/debug/app-debug.apk`

#### Build APK Release

```bash
# Build en mode release
capacitor build android --release

# Ou via Gradle
cd android
./gradlew assembleRelease
cd ..
```

L'APK sera généré dans : `android/app/build/outputs/apk/release/app-release.apk`

### Option 2 : Via Android Studio

```bash
# Ouvrir Android Studio
capacitor open android

# Dans Android Studio :
# 1. Build → Build Bundle(s) / APK(s) → Build APK(s)
# 2. Sélectionner la variante de build (debug/release)
# 3. Cliquer sur "Build"
```

---

## 📱 Tester sur Appareil / Émulateur

### Option 1 : Avec Capacitor

```bash
# Sur l'appareil connecté
capacitor run android

# Ou sur l'émulateur
capacitor run android --emulator
```

### Option 2 : Manuellement

```bash
# Installer l'APK
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Ou si plusieurs appareils
adb devices                    # Lister les appareils
adb -s <device_id> install path/to/app.apk
```

---

## 🔐 Signer l'Application (Pour Play Store)

### 1. Créer une Clé de Signature

```bash
# Créer un keystore
keytool -genkey -v -keystore release.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias release
```

Répondez aux questions de l'assistant (nom, organisation, pays, etc.)

### 2. Configurer capacitor.config.json

```json
{
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore",
      "keystoreAlias": "release",
      "keystoreAliasPassword": "votre_mot_de_passe",
      "keystorePassword": "votre_mot_de_passe",
      "releaseType": "APK"
    }
  }
}
```

### 3. Build Signé

```bash
capacitor build android --release
```

---

## 🐛 Debugging

### Afficher les Logs

```bash
# Logs en temps réel
adb logcat

# Filtrer les logs We-speak
adb logcat | grep "we-speak"

# Sauvegarder les logs
adb logcat > logs.txt
```

### Chrome DevTools

```bash
# L'app doit être en debug
# Ouvrir Chrome : chrome://inspect
```

### Déboguer une Build Release

```bash
# Sur une build APK release, ajouter WebContents.setDebuggingEnabled(true)
# dans MainActivity.java si nécessaire
```

---

## 📦 Variables d'Environnement

Assurez-vous que ces variables sont configurées :

```bash
# Linux/Mac
export ANDROID_SDK_ROOT=~/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# Windows
set ANDROID_SDK_ROOT=C:\Users\YourUsername\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_SDK_ROOT%\cmdline-tools\latest\bin
set PATH=%PATH%;%ANDROID_SDK_ROOT%\platform-tools
```

---

## ⚙️ Configuration Gradle (android/build.gradle)

Exemple de configuration recommandée :

```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.wespeak.app"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0.0"
    }
}
```

---

## 📋 Checklist Avant le Push Google Play

- [ ] Version code incrémentée
- [ ] Icône d'app créée (192x192, 512x512)
- [ ] Screenshots créés
- [ ] Description et permissions vérifiées
- [ ] Politique de confidentialité à jour
- [ ] App signé avec la bonne clé
- [ ] Test sur plusieurs appareils (API 21+)

---

## 🆘 Problèmes Courants

### Erreur : "ANDROID_SDK_ROOT not defined"

```bash
# Définir la variable d'environnement
export ANDROID_SDK_ROOT=~/Android/Sdk
```

### Erreur : "Gradle build failed"

```bash
# Nettoyer le cache Gradle
cd android
./gradlew clean
cd ..

# Relancer la build
capacitor build android
```

### Erreur : "No connected devices"

```bash
# Vérifier les appareils
adb devices

# Activer le débogage USB sur l'appareil Android
# Paramètres → À propos → Appuyer 7x sur "Numéro de build"
# Activer "Options de développement"
# Cocher "Débogage USB"
```

### APK trop volumineux

```bash
# Activer minification dans android/app/build.gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

---

## 📚 Ressources Utiles

- [Capacitor Documentation](https://capacitorjs.com/docs/getting-started)
- [Android Developer Guide](https://developer.android.com/guide)
- [Gradle Build System](https://developer.android.com/studio/build)
- [Google Play Console](https://play.google.com/console)

---

## 🚀 Commandes Rapides

```bash
# Setup complet
npm install && capacitor add android && capacitor sync android

# Build debug
capacitor build android

# Build release
capacitor build android --release

# Ouvrir dans Android Studio
capacitor open android

# Installer sur appareil
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Nettoyer
cd android && ./gradlew clean && cd ..
```

---

**Questions ?** Consultez la [documentation officielle Capacitor](https://capacitorjs.com/docs) ou créez une issue.
