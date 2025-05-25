# OpenNezt Docker Quick Setup
param(
    [Parameter(Position=0)]
    [string]$Action = "start"
)

function Write-Info { param([string]$msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Success { param([string]$msg) Write-Host "[SUCCESS] $msg" -ForegroundColor Green }
function Write-Error { param([string]$msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }

function Test-Docker {
    try {
        docker version | Out-Null
        return $true
    } catch {
        Write-Error "Docker không chạy. Vui lòng khởi động Docker Desktop."
        return $false
    }
}

function Start-Application {
    Write-Info "Khởi động OpenNezt Application..."
    
    if (-not (Test-Docker)) { return }
    
    # Build và start containers
    Write-Info "Building và starting containers..."
    docker-compose up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Containers đã khởi động thành công!"
        Write-Info "Truy cập ứng dụng:"
        Write-Host "  Frontend: http://localhost:3000 (chạy: cd Frontend && npm run dev)" -ForegroundColor Yellow
        Write-Host "  Backend:  http://localhost:3456" -ForegroundColor Yellow
        Write-Host "  MongoDB:  localhost:27017" -ForegroundColor Yellow
    } else {
        Write-Error "Lỗi khi khởi động containers"
    }
}

function Stop-Application {
    Write-Info "Dừng OpenNezt Application..."
    docker-compose down
    Write-Success "Đã dừng tất cả containers"
}

function Show-Status {
    Write-Info "Trạng thái containers:"
    docker-compose ps
    Write-Info "Logs gần đây:"
    docker-compose logs --tail=5
}

function Show-Logs {
    Write-Info "Hiển thị logs..."
    docker-compose logs -f
}

function Clean-All {
    Write-Info "Dọn dẹp containers và volumes..."
    docker-compose down -v --remove-orphans
    docker system prune -f
    Write-Success "Đã dọn dẹp xong"
}

function Show-Help {
    Write-Host "OpenNezt Docker Manager" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Cách sử dụng: .\docker-run.ps1 [action]" -ForegroundColor White
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor White
    Write-Host "  start    - Khởi động ứng dụng (mặc định)" -ForegroundColor Gray
    Write-Host "  stop     - Dừng ứng dụng" -ForegroundColor Gray
    Write-Host "  status   - Xem trạng thái" -ForegroundColor Gray
    Write-Host "  logs     - Xem logs" -ForegroundColor Gray
    Write-Host "  clean    - Dọn dẹp hoàn toàn" -ForegroundColor Gray
    Write-Host "  help     - Hiển thị help này" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Lưu ý: Frontend cần chạy riêng với 'cd Frontend && npm run dev'" -ForegroundColor Yellow
}

# Main execution
switch ($Action.ToLower()) {
    "start" { Start-Application }
    "stop" { Stop-Application }
    "status" { Show-Status }
    "logs" { Show-Logs }
    "clean" { Clean-All }
    "help" { Show-Help }
    default { 
        Write-Error "Action không hợp lệ: $Action"
        Show-Help
    }
}
