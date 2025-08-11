@echo off
echo Beende den Windows-Explorer...
taskkill /f /im explorer.exe
echo Loesche den Icon-Cache...
cd %userprofile%\AppData\Local
del /a /q IconCache.db
cd %userprofile%\AppData\Local\Microsoft\Windows\Explorer
del /a /q iconcache*
echo Starte den Windows-Explorer neu...
start explorer.exe
echo Fertig!
pause