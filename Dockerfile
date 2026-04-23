# 1. AŞAMA: TypeScript'i Derleme
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. AŞAMA: Çalıştırma
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
# Sadece gerekli kütüphaneleri kuruyoruz (devDependencies hariç)
RUN npm install --omit=dev
# Sadece derlenmiş dosyaları builder'dan alıyoruz
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/app.js"]