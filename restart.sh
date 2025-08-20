#!/bin/bash

# Script de redémarrage pour iFast.net
cd /home/votre_compte/atlantis-education

# Arrêt de l'application
if [ -f "app.pid" ]; then
    PID=$(cat app.pid)
    kill $PID
    rm app.pid
    echo "Application arrêtée (PID: $PID)"
fi

# Démarrage de l'application
export NODE_ENV=production
nohup npm start > /dev/null 2>&1 &
echo $! > app.pid
echo "Application redémarrée avec PID: $(cat app.pid)"