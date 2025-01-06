# **Collaborative Notes App** 
A Collaborative Notes Application powered by the MERN stack (MongoDB, Express, React, Node.js), designed for real-time collaboration. This app is containerized using Docker for streamlined development and deployment.


---

## **Setup Instructions**

### **1. Prerequisites**
Make sure the following are installed on your system:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### **2. Local Development Setup**

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Rename the `docker-compose.example.yml` file to `docker-compose.yml`:

3. Update the `docker-compose.yml` file:
   Replace `<mongo_uri>` in the `backend` service with your MongoDB connection string.

4. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

5. Access the application:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:7000](http://localhost:7000)

6. To stop the containers:
   ```bash
   docker-compose down
   ```

---

### **3. Production Deployment**

For production, follow these steps:

1. Update environment variables:
   - Set the `MONGO_URI` and `JWT_SECRET` in the `docker-compose.yml` file.

2. Build and run the containers in detached mode:
   ```bash
   docker-compose up --build -d
   ```

3. Use a reverse proxy (e.g., NGINX) to serve the frontend on port `80` and forward API requests to the backend.

---

## **Dockerfile Details**

### **Backend Dockerfile**
```dockerfile
FROM node:20-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7000
CMD ["node", "app.js"]
```

### **Frontend Dockerfile**
```dockerfile
FROM node:20-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## **Project URLs**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:7000](http://localhost:7000)

---

## **Troubleshooting**

### **1. Common Issues**
- **Port Conflicts**: Ensure no other services are running on `7000` or `3000`.
- **MongoDB Connection**: Verify the `MONGO_URI` in `docker-compose.yml`.

### **2. Logs**
To view logs for any service, use:
```bash
docker-compose logs <service-name>
```

---

Let me know if you need further assistance or additional sections!