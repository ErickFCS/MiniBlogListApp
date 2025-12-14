@echo off

call pnpm i

start "BackEnd" cmd /k pnpm dev

timeout /t 3 /nobreak > NUL

call pnpm seeds

cd FrontEnd
call pnpm i
start "Vanilla FrontEnd" cmd /k pnpm dev
cd ..

cd ReactQuery_FrontEnd
call pnpm i
start "ReactQuery FrontEnd" cmd /k pnpm dev
cd ..

cd Redux_FrontEnd
call pnpm i
start "Redux FrontEnd" cmd /k pnpm dev
cd ..
