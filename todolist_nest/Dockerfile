FROM node:22

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

# Exécuter les migrations Prisma
RUN npx prisma generate 

RUN npx prisma migrate dev


CMD ["npm", "start"]