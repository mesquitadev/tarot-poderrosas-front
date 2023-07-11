FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "dev"]
