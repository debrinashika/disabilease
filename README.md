### **README.md**  

# Disabilease Aplikasi Pembelajaran untuk Caregiver Anak Disabilitas  

Aplikasi ini adalah platform pembelajaran interaktif yang membantu orang tua anak disabilitas dalam mendapatkan informasi, sumber daya, dan dukungan yang dibutuhkan.


## 🛠️ Teknologi yang Digunakan  
### **Frontend**  
- Next.js (React)  
- TypeScript  
- Tailwind CSS  
- React Hook Form + Zod (Validasi Form)  
- Firebase Storage (Media Upload)  

### **Backend**  
- Next.js API Routes  
- Prisma ORM  
- PostgreSQL  
- Authentication dengan JWT  
- Firebase Storage untuk penyimpanan file  

---

## 🏗️ Cara Menjalankan Proyek  

### **1️⃣ Persyaratan**  
Pastikan Anda telah menginstal:  
- **Node.js** 
- **PostgreSQL**  
---

## 🚀 Menjalankan **Frontend**  

1. **Masuk ke folder frontend**  
   ```sh
   cd frontend
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Buat file `.env`**  
  copy .env.example ke .env
 
4. **Jalankan frontend**  
   ```sh
   npm run dev
   ```
   Frontend akan berjalan di `http://localhost:5173`.

---

## 🛠️ Menjalankan **Backend**  

1. **Masuk ke folder backend**  
   ```sh
   cd backend
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Buat file `.env`**  
  copy .env.example ke .env (user sama password sesuain sama milik pribadi)

4. **Jalankan migrasi Prisma**
    ```sh
     npx prisma migrate dev --name init
     Jika ingin mengecek database, bisa gunakan:
     npx prisma studio
   ```

5. **Jalankan backend**  
   ```sh
   npm run dev
   ```
   Backend akan berjalan di `http://localhost:4000`.

6. **Buat kalau mau seeding**
  ```sh
   npm run seed
   ```


---

