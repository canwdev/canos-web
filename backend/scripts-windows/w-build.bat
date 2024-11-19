cd /d %~dp0
cd ..\
cd ..\frontend
call yarn
call yarn build:frontend
cd ..\backend
call yarn
call yarn build

REM 删除并重建文件夹
rmdir /s /q .\can-os-web-windows
mkdir .\can-os-web-windows

REM 复制 build 出来的文件
xcopy .\dist .\can-os-web-windows\dist /E /I /Y
xcopy .\dist-frontend .\can-os-web-windows\dist-frontend /E /I /Y
copy .\yarn.lock .\can-os-web-windows\
copy .\package.json .\can-os-web-windows\
copy .\scripts-windows\w-run.bat .\can-os-web-windows\
copy .\scripts-windows\w-install-production.bat .\can-os-web-windows\
cd .\can-os-web-windows
call yarn install --production
cd ..\

REM 复制 node.exe 到指定路径
mkdir .\can-os-web-windows\bin
node -e "require('fs').copyFileSync(process.execPath, 'can-os-web-windows/bin/node.exe')"

REM 7z 创建自解压缩包
set "seven_zip_path=C:\Program Files\7-Zip\7z.exe"
"%seven_zip_path%" a -sfx can-os-web.exe .\can-os-web-windows\

pause;