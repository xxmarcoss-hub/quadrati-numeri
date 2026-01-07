#!/bin/bash
set -e

echo "=== Build iOS - Quadrati Numeri ==="

# Vai alla root del progetto
cd "$(dirname "$0")/.."

# 1. Build web assets
echo "[1/4] Building web assets..."
npm run build:web

# 2. Sync Capacitor
echo "[2/4] Syncing Capacitor..."
npx cap sync ios

# 3. Build con xcodebuild
echo "[3/4] Building iOS project..."
cd ios/App

# Pulisci build precedenti
xcodebuild clean -project App.xcodeproj -scheme App -configuration Release -quiet 2>/dev/null || true

# Build per simulatore (debug)
if [ "$1" == "--simulator" ]; then
    echo "Building for simulator..."
    xcodebuild build \
        -project App.xcodeproj \
        -scheme App \
        -configuration Debug \
        -destination 'platform=iOS Simulator,name=iPhone 16' \
        | grep -E '^(Build|Compile|Link|error:|warning:|\*\*)' || true
    echo ""
    echo "[4/4] Build completato per simulatore!"

# Lista dispositivi disponibili
elif [ "$1" == "--list" ]; then
    echo "Dispositivi disponibili:"
    cd ../..
    npx cap run ios --list

# Build e installa su device
elif [ "$1" == "--device" ]; then
    cd ../..
    if [ -n "$2" ]; then
        echo "Building and installing on target: $2"
        npx cap run ios --target "$2"
    else
        echo "Building and installing on device..."
        npx cap run ios
    fi
    echo ""
    echo "[4/4] App installata e avviata sul dispositivo!"

# Build archive per distribuzione
elif [ "$1" == "--archive" ]; then
    echo "Creating archive..."
    mkdir -p ../build
    xcodebuild archive \
        -project App.xcodeproj \
        -scheme App \
        -configuration Release \
        -archivePath ../build/QuadratiNumeri.xcarchive \
        | grep -E '^(Build|Archive|error:|warning:|\*\*)' || true
    echo ""
    echo "[4/4] Archive creato in ios/build/QuadratiNumeri.xcarchive"

else
    echo ""
    echo "Uso: ./scripts/build-ios.sh [opzione]"
    echo ""
    echo "Opzioni:"
    echo "  --list             Elenca dispositivi disponibili"
    echo "  --simulator        Build per simulatore iOS"
    echo "  --device [target]  Build, installa e avvia su dispositivo"
    echo "                     Se target non specificato, mostra menu interattivo"
    echo "  --archive          Crea archive per distribuzione App Store"
    echo ""
    echo "Per aprire in Xcode: npm run open:ios"
fi
