#!/bin/bash
set -e

echo "Starting Python backend..."
/home/coder/.venv/bin/python \
  /opt/myantigravity-backend/server.py --port 8000 &

WORKSPACE_BASE="/home/coder/project/workspace"
mkdir -p "$WORKSPACE_BASE"
cd "$WORKSPACE_BASE"

WORKSPACE_ID="workspace-$(date +%s)"
REPO_NAME="$WORKSPACE_ID"

GITHUB_API="https://api.github.com"
GITHUB_USERNAME="divakar3008200-cmyk"
GITHUB_TOKEN="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"   # ⚠️ move to env later
GITHUB_REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME"

# ----------- AUTO GITHUB LOGIN -----------
if ! gh auth status >/dev/null 2>&1; then
  echo "Signing VS Code into GitHub..."
  echo "$GITHUB_TOKEN" | gh auth login --with-token
fi

echo "Creating GitHub repo: $REPO_NAME"

HTTP_CODE=$(curl -s -o /tmp/gh.json -w "%{http_code}" \
  -X POST "$GITHUB_API/user/repos" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d "{\"name\":\"$REPO_NAME\",\"private\":false}")

cat /tmp/gh.json

if [ "$HTTP_CODE" != "201" ]; then
  echo "❌ GitHub repo creation failed"
  exit 1
fi

git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_USERNAME@users.noreply.github.com"

git init
git checkout -b main

cat <<EOF > README.md
# $REPO_NAME

This workspace is automatically generated.

GitHub Repository:
$GITHUB_REPO_URL
EOF

git add README.md
git commit -m "Initial commit"

# ---- DO NOT LET PUSH KILL THE SCRIPT ----
set +e
git remote add origin https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git
git push -u origin main
git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
set -e

echo "Starting code-server..."

exec code-server \
  --bind-addr 0.0.0.0:3002 \
  --auth none \
  "$WORKSPACE_BASE"
