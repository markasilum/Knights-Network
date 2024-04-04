# Knights Network

## Installations

### MySQL Database

Create a MySQL database named knightsnetwork:

```sql
create database knightsnetwork;
```
**NodeJS and ExpressJS Setup**

Install Node.js in the server folder:
```
npm init -y
```
Install Express in the server folder:
```
npm i express
```
Install nodemon globally:
```
npm i nodemon -D
```
Create scripts for starting the server in your package.json:
```
"scripts": {
  "start": "node server",
  "dev": "nodemon server"
}
```

### Prisma Setup
Install Prisma:
```
npm install prisma --save-dev
```
Run Prisma migration:
```
npx prisma migrate dev --name name_of_migration
```

### React Setup
cd to root directory

create react app with Vite
```
npm create vite@latest client  
√ Select a framework: » React
√ Select a variant: » JavaScript
cd client
npm install
npm run dev
```
