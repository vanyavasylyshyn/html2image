# HTML to JPEG API

## 📌 Description
This **Node.js** service uses **Puppeteer** to convert HTML content into **JPEG** images. It runs in a Docker container with Google Chrome.

## 🚀 Run Locally

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/html-to-jpeg-api.git
cd html-to-jpeg-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start the Server
```sh
node index.js
```

The server will start on `http://localhost:3000`

## 🐳 Run in Docker

### 1. Build the Docker Image
```sh
docker build -t html-to-jpeg-api .
```

### 2. Run the Container
```sh
docker run -p 3000:3000 --shm-size=1gb html-to-jpeg-api
```

## 🔥 API Usage

### **POST /convert**

🔹 **Description**: Converts HTML content into a JPEG image and returns it as `base64`.

🔹 **Headers**:
```json
{
  "Content-Type": "application/json"
}
```

🔹 **Body (JSON)**:
```json
{
  "content": "<h1>Hello, world!</h1>"
}
```

🔹 **Response (JSON)**:
```json
{
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD..."  // Base64 string
}
```

### Usage with cURL
```sh
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d '{"content": "<h1>Hello, world!</h1>"}'
```

## ⚙️ Environment Variables
The service supports the following `ENV` variables:

| Variable  | Description | Default Value |
|---------|------|-------------------------|
| `PORT`  | Server port | `3000` |
| `PUPPETEER_EXECUTABLE_PATH` | Path to Chrome | `/usr/bin/google-chrome-stable` |

Example of running with a custom port:
```sh
docker run -p 4000:4000 -e PORT=4000 html-to-jpeg-api
```

## 🛠 Requirements
- Node.js 18+
- Puppeteer
- Google Chrome
- Docker (optional)

## 📝 License
MIT License © 2025 Your Name

