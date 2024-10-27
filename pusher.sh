#!/bin/bash
comm="bot at $(date '+%Y-%m-%d %H:%M:%S')"
git add .
git commit -m "$comm"
git push origin main
