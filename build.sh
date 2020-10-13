#!/bin/bash
export GAME_TYPE=$1
env='dev'
if [[ "$2" ]] ; then
    env=$2
fi
export NODE_ENV=$env
node server.js
