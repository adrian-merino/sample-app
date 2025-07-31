FROM node:alpine
RUN mkdir /random-app/
WORKDIR /random-app/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]