cd /d %~dp0
cd ..\
cd ..\frontend
call yarn
call yarn build:frontend
cd ..\backend
call yarn
call yarn build

REM 删除并重建文件夹
rmdir /s /q .\dist-windows
mkdir .\dist-windows

REM 复制 build 出来的文件
xcopy .\dist .\dist-windows\dist /E /I /Y
xcopy .\dist-frontend .\dist-windows\dist-frontend /E /I /Y
copy .\yarn.lock .\dist-windows\
copy .\package.json .\dist-windows\
copy .\scripts-windows\w-run.bat .\dist-windows\
copy .\scripts-windows\w-install-production.bat .\dist-windows\
cd .\dist-windows
call yarn install --production
cd ..\

REM 复制 node.exe 到指定路径
mkdir .\dist-windows\bin
node -e "require('fs').copyFileSync(process.execPath, 'dist-windows/bin/node.exe')"

REM 7z 创建自解压缩包
set "seven_zip_path=C:\Program Files\7-Zip\7z.exe"
"%seven_zip_path%" a -sfx can-os-web.exe .\dist-windows\

pause;