# Koristimo Node image
FROM node:20-alpine

# Radni direktorijum
WORKDIR /app

# Kopiramo package fajlove
COPY package*.json ./

# Instaliramo dependencies
RUN npm install

# Kopiramo ostatak koda
COPY . .

# Build TypeScript-a
RUN npm run build

# Otvaramo port
EXPOSE 5000

# Pokretanje aplikacije
CMD ["npm", "start"]