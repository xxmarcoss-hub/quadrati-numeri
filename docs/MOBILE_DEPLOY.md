# Deploy Mobile iOS e Android

Guida per compilare e distribuire l'app su dispositivi e store.

## Prerequisiti

### Generale
```bash
npm install
```

### iOS
- macOS con Xcode installato
- Account Apple Developer (per dispositivi fisici e App Store)
- Certificati e profili di provisioning configurati

### Android
- Android Studio installato
- Java JDK 21+
- Account Google Play Console (per Play Store)
- Keystore per firma release

---

## Script Disponibili

| Script | Descrizione |
|--------|-------------|
| `npm run cap:sync` | Sincronizza i file web con le piattaforme native |
| `npm run open:ios` | Apre il progetto in Xcode |
| `npm run open:android` | Apre il progetto in Android Studio |
| `npm run build:ios:device` | Build e installa su dispositivo/simulatore iOS |
| `npm run build:android:device` | Build e installa su dispositivo/emulatore Android |
| `npm run generate:assets` | Rigenera icone e splash screen |
| `npm run build:ios:sim` | Build per simulatore iOS |
| `npm run build:ios:archive` | Crea archive iOS per App Store |
| `npm run build:android:debug` | Build APK debug Android |
| `npm run build:android:release` | Build APK release Android (unsigned) |
| `npm run build:android:bundle` | Build AAB per Google Play Store |

### Script Bash

Per un controllo più granulare, puoi usare direttamente gli script bash:

```bash
# iOS
./scripts/build-ios.sh              # Mostra opzioni disponibili
./scripts/build-ios.sh --simulator  # Build per simulatore
./scripts/build-ios.sh --device     # Build per device (no code signing)
./scripts/build-ios.sh --archive    # Crea archive per distribuzione

# Android
./scripts/build-android.sh          # Mostra opzioni disponibili
./scripts/build-android.sh --debug  # APK debug
./scripts/build-android.sh --release # APK release (unsigned)
./scripts/build-android.sh --bundle # AAB per Play Store
./scripts/build-android.sh --clean  # Pulisce build precedenti
```

---

## Deploy su Dispositivi (Development)

### iOS - Simulatore

```bash
npm run build:ios:sim
```

Questo compila l'app e la rende disponibile nel simulatore iPhone 16.

In alternativa, per selezionare manualmente un simulatore:
```bash
npm run build:ios:device
```

### iOS - Dispositivo Fisico

1. Collega il dispositivo via USB
2. Abilita "Modalità sviluppatore" su iPhone/iPad (Impostazioni > Privacy e Sicurezza)
3. Esegui:
```bash
npm run build:ios:device
```
4. Seleziona il dispositivo dalla lista

**Nota:** La prima volta dovrai autorizzare il certificato sviluppatore sul dispositivo:
- iPhone > Impostazioni > Generali > Gestione dispositivo > Autorizza

### Android - Emulatore

1. Avvia un emulatore da Android Studio (Device Manager)
2. Esegui:
```bash
npm run build:android:device
```

### Android - Dispositivo Fisico

1. Abilita "Opzioni sviluppatore" sul dispositivo:
   - Impostazioni > Info telefono > Tocca 7 volte "Numero build"
2. Abilita "Debug USB" nelle Opzioni sviluppatore
3. Collega il dispositivo via USB e autorizza il computer
4. Esegui:
```bash
npm run build:android:device
```

---

## Deploy sugli Store (Release)

### iOS - App Store

#### Opzione 1: Da linea di comando

```bash
npm run build:ios:archive
```

L'archive viene creato in `ios/build/QuadratiNumeri.xcarchive`. Poi aprilo in Xcode per distribuire.

#### Opzione 2: Da Xcode

1. **Apri Xcode:**
```bash
npm run open:ios
```

2. **Configura il signing:**
   - Seleziona il target "App" nel navigator
   - Tab "Signing & Capabilities"
   - Seleziona il tuo Team
   - Assicurati che "Automatically manage signing" sia attivo

3. **Incrementa versione:**
   - Tab "General"
   - Aggiorna "Version" (es. 1.0.1) e "Build" (es. 2)

4. **Crea l'archive:**
   - Menu: Product > Archive
   - Attendi il completamento

5. **Distribuisci:**
   - Nella finestra Organizer, seleziona l'archive
   - Click "Distribute App"
   - Seleziona "App Store Connect"
   - Segui la procedura guidata

6. **Su App Store Connect:**
   - Vai su [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Completa le informazioni dell'app
   - Invia per la review

### Android - Google Play Store

#### Opzione 1: Da linea di comando

```bash
# APK release (per test)
npm run build:android:release

# AAB per Play Store
npm run build:android:bundle
```

I file vengono creati in:
- APK: `android/app/build/outputs/apk/release/app-release-unsigned.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

**Nota:** Per firmare l'APK/AAB da linea di comando, configura il keystore in `android/app/build.gradle`.

#### Opzione 2: Da Android Studio

1. **Apri Android Studio:**
```bash
npm run open:android
```

2. **Configura il keystore** (solo la prima volta):

   Crea un nuovo keystore:
   - Menu: Build > Generate Signed Bundle / APK
   - Seleziona "Android App Bundle"
   - Click "Create new..." per creare un keystore
   - Compila i campi e salva il keystore in un posto sicuro

   **Importante:** Conserva il keystore e le password! Senza di essi non potrai aggiornare l'app.

3. **Incrementa versione:**

   Modifica `android/app/build.gradle`:
   ```gradle
   defaultConfig {
       versionCode 2        // Incrementa ad ogni release
       versionName "1.0.1"  // Versione visibile agli utenti
   }
   ```

4. **Genera l'App Bundle firmato:**
   - Menu: Build > Generate Signed Bundle / APK
   - Seleziona "Android App Bundle"
   - Seleziona il keystore esistente
   - Seleziona "release"
   - Click "Create"

   Il file `.aab` sarà in `android/app/release/`

5. **Carica su Play Console:**
   - Vai su [play.google.com/console](https://play.google.com/console)
   - Seleziona l'app (o creane una nuova)
   - Produzione > Crea nuova release
   - Carica il file `.aab`
   - Completa le informazioni e invia per la review

---

## Risoluzione Problemi

### iOS: "Signing certificate not found"
Apri Xcode > Preferences > Accounts > Gestisci i certificati

### iOS: "Device is not registered"
Aggiungi l'UDID del dispositivo su developer.apple.com > Devices

### Android: "JAVA_HOME not set"
```bash
export JAVA_HOME=$(/usr/libexec/java_home)
```

### Android: "SDK location not found"
Crea `android/local.properties`:
```
sdk.dir=/Users/TUOUSERNAME/Library/Android/sdk
```

### Build fallita dopo modifiche al codice
```bash
npm run cap:sync
```

---

## Struttura File Nativi

```
ios/
└── App/
    └── App/
        ├── Assets.xcassets/    # Icone e splash
        └── Info.plist          # Configurazione app

android/
└── app/
    ├── build.gradle            # Versione e config
    └── src/main/
        ├── res/                # Icone e splash
        └── AndroidManifest.xml # Permessi e config
```
