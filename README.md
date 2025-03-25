# disabilease

## Full-Stack Setup with React, Vite, and Express

This guide walks you through setting up a full-stack web application using React, Vite, and Express.

## Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js) or yarn

## Project Structure
```
my-fullstack-app/
  ├── frontend/   # React + Vite frontend
  ├── backend/    # Express backend
```

## Run the Project
To start the project, open two terminals and run the following commands:

### Terminal 1 (Backend)
```sh
cd backend
node server.js
```

### Terminal 2 (Frontend)
```sh
cd frontend
npm run dev
```

## 4. Build dan Jalankan dengan Docker Compose
Jalankan perintah berikut untuk membangun dan menjalankan semua layanan:

```sh
docker-compose up --build
```

## 5. Akses Aplikasi
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:3000/api`
- **Cek Database**:
  ```sh
  docker exec -it disabilease-db-1 psql -U dbuser -d maindb

  ```

## 6. Menjalankan Ulang atau Menghentikan Layanan
- **Stop layanan**:
  ```sh
  docker-compose down
  ```
- **Restart layanan**:
  ```sh
  docker-compose up -d
  ```


