#!/bin/bash
set -e

echo "=== Build Android - Quadrati Numeri ==="

# Vai alla root del progetto
cd "$(dirname "$0")/.."

# 1. Build web assets
echo "[1/4] Building web assets..."
npm run build:web

# 2. Sync Capacitor
echo "[2/4] Syncing Capacitor..."
npx cap sync android

# 3. Build con Gradle
echo "[3/4] Building Android project..."
cd android

# Build debug APK
if [ "$1" == "--debug" ]; then
    echo "Building debug APK..."
    ./gradlew assembleDebug
    echo ""
    echo "[4/4] APK debug creato:"
    echo "  android/app/build/outputs/apk/debug/app-debug.apk"

# Build release APK
elif [ "$1" == "--release" ]; then
    echo "Building release APK..."
    ./gradlew assembleRelease
    echo ""
    echo "[4/4] APK release creato:"
    echo "  android/app/build/outputs/apk/release/app-release-unsigned.apk"

# Build AAB per Play Store
elif [ "$1" == "--bundle" ]; then
    echo "Building App Bundle (AAB)..."
    ./gradlew bundleRelease
    echo ""
    echo "[4/4] AAB creato:"
    echo "  android/app/build/outputs/bundle/release/app-release.aab"

# Build e installa su device
elif [ "$1" == "--device" ]; then
    echo "Building and installing on device..."
    cd ..
    npx cap run android
    echo ""
    echo "[4/4] App installata e avviata sul dispositivo!"

# Clean build
elif [ "$1" == "--clean" ]; then
    echo "Cleaning build..."
    ./gradlew clean
    echo "[4/4] Clean completato!"

else
    echo ""
    echo "Uso: ./scripts/build-android.sh [opzione]"
    echo ""
    echo "Opzioni:"
    echo "  --device    Build, installa e avvia su dispositivo/emulatore"
    echo "  --debug     Build APK debug"
    echo "  --release   Build APK release (unsigned)"
    echo "  --bundle    Build AAB per Play Store"
    echo "  --clean     Pulisci build precedenti"
    echo ""
    echo "Per aprire in Android Studio: npm run open:android"
fi
