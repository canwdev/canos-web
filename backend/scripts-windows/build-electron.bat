cd /d %~dp0
cd ..\
cd ..\frontend
call yarn
call yarn build:frontend
cd ..\backend
call yarn
call yarn build
call yarn electron:build
pause;