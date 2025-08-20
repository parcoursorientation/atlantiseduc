#!/bin/bash

# Script d'arrêt pour iFast.net
cd /home/votre_compte/atlantis-education

if [ -f "app.pid" ]; then
    PID=$(cat app.pid)
    kill $PID
    rm app.pid
    echo "Application arrêtée (PID: $PID)"
else
    echo "Aucun fichier PID trouvé. L'application n'est peut-être pas en cours d'exécution."
fi