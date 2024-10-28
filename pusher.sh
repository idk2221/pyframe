#!/bin/bash
d=5
l="/tmp/git_autocommit.lock"
f() {
  m="bot at $(date '+%Y-%m-%d %H:%M:%S')"
  git add .
  git commit -m "$m"
  git git push origin main --force
}
if [ -f "$l" ]; then
  t=$(stat -f %m "$l")
  c=$(date +%s)
  if (( c - t < d )); then
    exit 0
  fi
fi
touch "$l"
f
