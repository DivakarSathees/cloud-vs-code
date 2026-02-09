#!/bin/bash
set -e

export HOME=/home/coder

echo "USER: $(whoami)"
echo "HOME: $HOME"

# ------------------ PREP ------------------
mkdir -p /home/coder/.config
chmod 700 /home/coder/.config

# ------------------ BACKEND ------------------
echo "Starting Python backend..."
/home/coder/.venv/bin/python /opt/myantigravity-backend/server.py --port 8000 &

# ------------------ REQUIRED ENV ------------------
: "${GITHUB_USERNAME:?Missing GITHUB_USERNAME}"
: "${GITHUB_TOKEN:?Missing GITHUB_TOKEN}"

# ------------------ GITHUB CLI LOGIN (PERSISTED) ------------------
echo "🔐 Logging into GitHub via gh (persistent)..."


GH_TOKEN_VALUE="$GITHUB_TOKEN"
unset GITHUB_TOKEN
unset GH_TOKEN
echo "Token length: ${#GH_TOKEN_VALUE}"

echo "$GH_TOKEN_VALUE" | gh auth login --hostname github.com --with-token

# 🔑 THIS IS THE MAGIC FOR SOURCE CONTROL
gh auth setup-git

echo "✅ gh authentication configured"
gh auth status

# ------------------ WORKSPACE ------------------
WORKSPACE_BASE="/home/coder/project/workspace"
mkdir -p "$WORKSPACE_BASE"
cd "$WORKSPACE_BASE"

WORKSPACE_ID="workspace-$(date +%s)"
REPO_NAME="$WORKSPACE_ID"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# ------------------ CREATE REPO ------------------
echo "Creating GitHub repo: $REPO_NAME"

HTTP_CODE=$(curl -s -o /tmp/gh.json -w "%{http_code}" \
  -X POST https://api.github.com/user/repos \
  -H "Authorization: token $GH_TOKEN_VALUE" \
  -H "Accept: application/vnd.github+json" \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false}")

if [ "$HTTP_CODE" != "201" ]; then
  cat /tmp/gh.json
  exit 1
fi

# ------------------ GIT INIT ------------------
git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_USERNAME@users.noreply.github.com"

git init
git checkout -b main

cat <<EOF > README.md
# $REPO_URL

This workspace uses GitHub CLI authentication.
VS Code Source Control is enabled.
EOF

chmod 444 README.md

git add README.md
git commit -m "Initial commit"

# 🔑 IMPORTANT: NO TOKEN IN REMOTE URL
git remote add origin "$REPO_URL"
git push -u origin main

echo "✅ Repo pushed using gh credential helper"

# ------------------ START CODE-SERVER ------------------
# ------------------ START CODE-SERVER ------------------
PORT=${PORT:-8443}
echo "Starting code-server on PORT=$PORT"

# exec code-server \
#   --bind-addr 0.0.0.0:$PORT \
#   --cert \
#   --auth none \
#   "$WORKSPACE_BASE"

exec code-server \
  --bind-addr 0.0.0.0:$PORT \
  --auth none \
  "$WORKSPACE_BASE"
