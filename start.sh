#!/bin/bash
set -e

echo "Starting Python backend..."
/home/coder/.venv/bin/python /opt/myantigravity-backend/server.py --port 8000 &

echo "Starting code-server..."
exec /usr/bin/code-server /home/coder/project/workspace
