#!/bin/bash

pnpm i
xterm -T "BackEnd" -e pnpm dev &
sleep 3 > /dev/null 2>&1
pnpm seeds
cd ./FrontEnd/
pnpm i
xterm -T "Vanilla FrontEnd" -e pnpm dev &
cd ..
cd ./ReactQuery_FrontEnd/
pnpm i
xterm -T "ReactQuery FrontEnd" -e pnpm dev &
cd ..
cd ./Redux_FrontEnd/
pnpm i
xterm -T "Redux FrontEnd" -e pnpm dev &
cd ..
