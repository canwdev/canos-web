@echo off
cd /d %~dp0

REM 设置环境变量
set IS_CLIENT_ONLY=1
REM 使用环境变量
echo IS_CLIENT_ONLY=%IS_CLIENT_ONLY%

.\bin\node.exe .\dist\main.js
