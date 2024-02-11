@echo off

set clientNewEnvPath=".\client\.env.local"
set serverNewEnvPath=".\server\.env"

echo Initializing client variables

if exist %clientNewEnvPath% (
    echo File already exists. Removing and creating new version
    del %clientNewEnvPath%
    type nul > %clientNewEnvPath%
) else (
    type nul > %clientNewEnvPath%
)

type ".\client\.env.example" >> %clientNewEnvPath%

echo Initializing server variables

if exist %serverNewEnvPath% (
    echo File already exists. Removing and creating new version
    del %serverNewEnvPath%
    type nul > %serverNewEnvPath%
) else (
    type nul > %serverNewEnvPath%
)

type ".\server\.env.example" >> %serverNewEnvPath%

echo Environment variables initialized. Please add values to them
exit /b 0
