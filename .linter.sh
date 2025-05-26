#!/bin/bash
cd /home/kavia/workspace/code-generation/recipevault-34928-34933/main_container_for_recipevault
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

