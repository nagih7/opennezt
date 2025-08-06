# 🚀 OpenNezt - Quick Start Guide

## ⚡ Chạy nhanh (1 lệnh)

```powershell
# Khởi động toàn bộ ứng dụng
.\docker-run.ps1 start
```

## 🌐 Truy cập ứng dụng

-  **Frontend**: http://localhost:3000 (chạy local với `npm run dev`)
-  **Backend API**: http://localhost:3456
-  **MongoDB**: Sử dụng MongoDB Atlas (cloud database)

## 📋 Yêu cầu

-  Docker Desktop (đã khởi động)
-  Node.js 18+ (cho Frontend)
-  MongoDB Atlas account (miễn phí tại https://mongodb.com/atlas)

## 🔧 Commands

```powershell
# Khởi động ứng dụng
.\docker-run.ps1 start

# Dừng ứng dụng
.\docker-run.ps1 stop

# Xem trạng thái
.\docker-run.ps1 status

# Xem logs
.\docker-run.ps1 logs

# Dọn dẹp hoàn toàn
.\docker-run.ps1 clean
```

## 🏗️ Cấu trúc

```
OpenNezt/
├── docker-run.ps1          # Script chính để quản lý
├── docker-compose.yml      # Cấu hình containers
├── .env                    # Environment variables
├── Backend/                # API Server (Docker)
└── Frontend/               # React App (Local dev)
```

## 📝 Setup lần đầu

1. **Clone & MongoDB Atlas Setup**

   ```powershell
   git clone <repo>
   cd OpenNezt
   ```

   **Cấu hình MongoDB Atlas:**

   -  Tạo tài khoản tại https://mongodb.com/atlas
   -  Tạo cluster mới (miễn phí)
   -  Tạo database user và ghi nhớ username/password
   -  Thêm IP address vào whitelist (0.0.0.0/0 cho development)
   -  Copy connection string từ Atlas

2. **Environment Variables**

   ```powershell
   # Tạo file .env từ template
   cp .env.example .env

   # Cập nhật với thông tin MongoDB Atlas của bạn
   # DB_PORT=27017
   # DB_USER=your_db_user
   # DB_USERNAME=your_username
   # DB_PASSWORD=your_password
   # DB_NAME=your_db_name
   # DB_AUTH_SOURCE=admin
   ```

3. **Khởi động Backend (sử dụng Atlas)**

   ```powershell
   .\docker-run.ps1 start
   ```

4. **Khởi động Frontend (terminal mới)**
   ```powershell
   cd Frontend
   npm install
   npm run dev
   ```

## 🛠️ Troubleshooting

**Docker không chạy:**

-  Khởi động Docker Desktop
-  Chờ Docker sẵn sàng (icon màu xanh)

**Port đã sử dụng:**

```powershell
.\docker-run.ps1 stop
```

**Reset hoàn toàn:**

```powershell
.\docker-run.ps1 clean
.\docker-run.ps1 start
```

**Xem logs lỗi:**

```powershell
.\docker-run.ps1 logs
```

## 🔐 Database Configuration

-  **MongoDB Atlas**: Cấu hình trong file .env
-  **Database**: `OpenNezt-V1`
-  **Connection**: Secure cloud connection via Atlas

## 📦 Tech Stack

-  **Backend**: Node.js + Express (Docker)
-  **Frontend**: React + Vite + TypeScript (Local)
-  **Database**: MongoDB Atlas (Cloud)
-  **Cache**: Redis (Docker)

---

**Lưu ý**:

-  Frontend chạy local để development dễ dàng hơn
-  Backend chạy trong Docker để consistency
-  Database sử dụng MongoDB Atlas (cloud) để hiệu năng và tính ổn định cao
