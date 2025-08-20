#!/bin/bash

# Script de démarrage pour iFast.net
cd /home/votre_compte/atlantis-education
export NODE_ENV=production
nohup npm start > /dev/null 2>&1 &
echo $! > app.pid
echo "Application démarrée avec PID: $(cat app.pid)"