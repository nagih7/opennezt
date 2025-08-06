@echo off
echo OpenNezt Docker Manager
echo.
echo Usage: run.bat [action]
echo.
echo Actions:
echo   start    - Start application (Backend + Database)
echo   stop     - Stop all containers
echo   status   - Show container status
echo   logs     - Show logs
echo   clean    - Clean up containers and volumes
echo   frontend - Start Frontend development server
echo.

if "%1"=="start" (
    echo [INFO] Starting OpenNezt containers...
    docker-compose up -d --build
    echo [SUCCESS] Containers started!
    echo [INFO] Frontend: cd Frontend ^&^& npm run dev
    echo [INFO] Backend: http://localhost:3456
    goto :eof
)

if "%1"=="stop" (
    echo [INFO] Stopping containers...
    docker-compose down
    echo [SUCCESS] Containers stopped!
    goto :eof
)

if "%1"=="status" (
    echo [INFO] Container status:
    docker-compose ps
    goto :eof
)

if "%1"=="logs" (
    echo [INFO] Showing logs...
    docker-compose logs -f
    goto :eof
)

if "%1"=="clean" (
    echo [INFO] Cleaning up...
    docker-compose down -v --remove-orphans
    docker system prune -f
    echo [SUCCESS] Cleanup complete!
    goto :eof
)

if "%1"=="frontend" (
    echo [INFO] Starting Frontend development server...
    cd Frontend
    npm run dev
    goto :eof
)

echo [ERROR] Invalid action: %1
echo Run 'run.bat' without parameters to see help.
