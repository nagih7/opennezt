# OpenNezt Docker Quick Setup
param(
    [Parameter(Position=0)]
    [string]$Action = "start",
    [Parameter(Position=1)]
    [string]$Version = "latest",
    [Parameter(Position=2)]
    [string]$Registry = "your-dockerhub-username"
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

function Build-Production {
    Write-Info "Building production images..."
    
    if (-not (Test-Docker)) { return }
    
    # Build backend production image
    Write-Info "Building backend production image..."
    docker build -t opennezt-backend:$Version -f Backend/Dockerfile Backend/
    
    # Build frontend production image  
    Write-Info "Building frontend production image..."
    docker build -t opennezt-frontend:$Version -f Frontend/Dockerfile Frontend/
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production images đã build thành công!"
        Write-Info "Images được tạo:"
        Write-Host "  opennezt-backend:$Version" -ForegroundColor Yellow
        Write-Host "  opennezt-frontend:$Version" -ForegroundColor Yellow
    } else {
        Write-Error "Lỗi khi build production images"
    }
}

function Tag-Images {
    Write-Info "Tagging images cho Docker Hub..."
    
    if (-not (Test-Docker)) { return }
    
    # Tag backend image
    docker tag opennezt-backend:$Version $Registry/opennezt-backend:$Version
    docker tag opennezt-backend:$Version $Registry/opennezt-backend:latest
    
    # Tag frontend image
    docker tag opennezt-frontend:$Version $Registry/opennezt-frontend:$Version
    docker tag opennezt-frontend:$Version $Registry/opennezt-frontend:latest
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Images đã được tag thành công!"
        Write-Info "Tagged images:"
        Write-Host "  $Registry/opennezt-backend:$Version" -ForegroundColor Yellow
        Write-Host "  $Registry/opennezt-backend:latest" -ForegroundColor Yellow
        Write-Host "  $Registry/opennezt-frontend:$Version" -ForegroundColor Yellow
        Write-Host "  $Registry/opennezt-frontend:latest" -ForegroundColor Yellow
    } else {
        Write-Error "Lỗi khi tag images"
    }
}

function Push-Images {
    Write-Info "Pushing images lên Docker Hub..."
    
    if (-not (Test-Docker)) { return }
    
    # Check if user is logged in to Docker Hub
    $loginCheck = docker info 2>&1 | Select-String "Username"
    if (-not $loginCheck) {
        Write-Info "Đăng nhập Docker Hub..."
        docker login
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Lỗi đăng nhập Docker Hub"
            return
        }
    }
    
    # Push backend images
    Write-Info "Pushing backend images..."
    docker push $Registry/opennezt-backend:$Version
    docker push $Registry/opennezt-backend:latest
    
    # Push frontend images
    Write-Info "Pushing frontend images..."
    docker push $Registry/opennezt-frontend:$Version
    docker push $Registry/opennezt-frontend:latest
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Images đã được push lên Docker Hub thành công!"
        Write-Info "Docker Hub links:"
        Write-Host "  https://hub.docker.com/r/$Registry/opennezt-backend" -ForegroundColor Yellow
        Write-Host "  https://hub.docker.com/r/$Registry/opennezt-frontend" -ForegroundColor Yellow
    } else {
        Write-Error "Lỗi khi push images"
    }
}

function Deploy-Complete {
    Write-Info "Thực hiện build, tag và push hoàn chỉnh..."
    
    Build-Production
    if ($LASTEXITCODE -ne 0) { return }
    
    Tag-Images
    if ($LASTEXITCODE -ne 0) { return }
    
    Push-Images
    
    Write-Success "Hoàn thành quá trình deploy lên Docker Hub!"
}

function Deploy-Production {
    Write-Info "Deploy production environment..."
    
    if (-not (Test-Docker)) { return }
    
    # Check if .env file exists
    if (-not (Test-Path ".env")) {
        Write-Error "File .env không tồn tại. Vui lòng tạo từ .env.example"
        Write-Info "Chạy: cp .env.example .env và chỉnh sửa thông tin"
        return
    }
    
    # Deploy using production compose file
    Write-Info "Starting production containers..."
    docker-compose -f docker-compose.prod.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production environment đã khởi động thành công!"
        Write-Info "Kiểm tra trạng thái:"
        docker-compose -f docker-compose.prod.yml ps
    } else {
        Write-Error "Lỗi khi deploy production"
    }
}

function Show-Help {
    Write-Host "OpenNezt Docker Manager" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Cách sử dụng: .\docker-run.ps1 [action] [version] [registry]" -ForegroundColor White
    Write-Host ""
    Write-Host "Actions:" -ForegroundColor White
    Write-Host "  start      - Khởi động ứng dụng (mặc định)" -ForegroundColor Gray
    Write-Host "  stop       - Dừng ứng dụng" -ForegroundColor Gray
    Write-Host "  status     - Xem trạng thái" -ForegroundColor Gray
    Write-Host "  logs       - Xem logs" -ForegroundColor Gray
    Write-Host "  clean      - Dọn dẹp hoàn toàn" -ForegroundColor Gray
    Write-Host "  build      - Build production images" -ForegroundColor Gray    Write-Host "  tag        - Tag images cho Docker Hub" -ForegroundColor Gray
    Write-Host "  push       - Push images lên Docker Hub" -ForegroundColor Gray
    Write-Host "  deploy     - Build, tag và push hoàn chỉnh" -ForegroundColor Gray
    Write-Host "  prod       - Deploy production environment" -ForegroundColor Gray
    Write-Host "  help       - Hiển thị help này" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Tham số tùy chọn:" -ForegroundColor White
    Write-Host "  version    - Version tag cho images (mặc định: latest)" -ForegroundColor Gray
    Write-Host "  registry   - Docker Hub username (mặc định: your-dockerhub-username)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Ví dụ:" -ForegroundColor White
    Write-Host "  .\docker-run.ps1 deploy v1.0.0 myusername" -ForegroundColor Gray
    Write-Host "  .\docker-run.ps1 push latest myusername" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Lưu ý: Frontend cần chạy riêng với 'cd Frontend && npm run dev'" -ForegroundColor Yellow
    Write-Host "Đảm bảo đã đăng nhập Docker Hub: docker login" -ForegroundColor Yellow
}

# Main execution
switch ($Action.ToLower()) {
    "start" { Start-Application }
    "stop" { Stop-Application }
    "status" { Show-Status }
    "logs" { Show-Logs }
    "clean" { Clean-All }
    "build" { Build-Production }
    "tag" { Tag-Images }
    "push" { Push-Images }
    "deploy" { Deploy-Complete }
    "prod" { Deploy-Production }
    "help" { Show-Help }
    default { 
        Write-Error "Action không hợp lệ: $Action"
        Show-Help
    }
}
