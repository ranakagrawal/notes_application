# **Collaborative Notes App**  
A Collaborative Notes Application powered by the **MERN stack** (MongoDB, Express, React, Node.js), designed for real-time collaboration. This app is containerized using Docker for streamlined development and deployment.

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
   ```bash
   mv docker-compose.example.yml docker-compose.yml
   ```

3. Update the `docker-compose.yml` file:
   - Replace `<mongo_uri>` with your MongoDB connection string in the `backend` service:
     ```yaml
     environment:
       - MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db_name
       - JWT_SECRET=syvoranotesapp
       - PORT=7000
     ```
   - Replace `<backend url>` with the backend service URL in the `frontend` service:
     ```yaml
     environment:
       - API_URL=http://localhost:7000
     ```

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
   - Set the `MONGO_URI` and `JWT_SECRET` in the `docker-compose.yml` file:
     ```yaml
     environment:
       - MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db_name
       - JWT_SECRET=<Your JWT Secret>
       - PORT=7000
     ```
   - Set the `API_URL` in the `frontend` service to point to the production backend URL:
     ```yaml
     environment:
       - API_URL=<backend-deployment-url>
     ```

2. Build and run the containers in detached mode:
   ```bash
   docker-compose up --build -d
   ```

3. Use a reverse proxy (e.g., NGINX) to serve the frontend on port `80` and forward API requests to the backend.

---

## **Environment Variables**

### **Backend**
The following environment variables need to be set in the `backend` service:
- `MONGO_URI`: Connection string for your MongoDB instance.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `PORT`: Port for the backend server (default is `7000`).

### **Frontend**
The following environment variable needs to be set in the `frontend` service:
- `API_URL`: The base URL of the backend API.
  - Example: `http://localhost:7000` (for local development) or `<backend-deployment-url>` (for production).

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

Let me know if any further updates are required!