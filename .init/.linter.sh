#!/bin/bash
cd /home/kavia/workspace/code-generation/jira-confluence-connector-147090-147122/jira_confluence_connector_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

