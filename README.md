# ** QR Code Generator**

A **QR Code Generator** with customization options for colors, background, and download choices in **PNG** and **PDF**. Built with **React**, **Material UI**, and **qrcode.react**.

---

## **🚀 Features**

✅ Real-time QR code generation.  
✅ Customizable QR code colors and background with hex preview and reset option.
✅ Option for a **transparent background**.  
✅ Download as **PNG** (with or without background).  
✅ Download as **PDF** (centered and optimized).  
✅ **Responsive design** with **Material UI**.  
✅ **Runs with Docker and Docker Compose**.

---

## **📥 Installation**

### 🔹 **Option 1: Run with Docker Compose (Recommended)**

If you have **Docker** and **Docker Compose**, you can start the project with a single command:

```bash
# Clone the repository
git clone https://github.com/brygallo/QRCodeGenerator.git
cd qr-generator-react

# Start the container with Docker Compose
docker-compose up --build
```

The app will be available at:  
🔗 `http://localhost:5173`

---

### 🔹 **Option 2: Run with Docker only**

If you don’t want to use **Docker Compose**, you can run the container manually:

```bash
docker build -t qr-generator .
docker run -p 5173:5173 qr-generator
```

---

### 🔹 **Option 3: Run Locally with Node.js**

If you prefer to run the project locally without Docker:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## **🛠 Technologies Used**

- **React** (Vite)
- **Material UI** (`@mui/material`)
- **QRCode.react** (For generating QR codes)
- **html2canvas** & **jsPDF** (For downloading the QR code as an image or PDF)
- **Docker & Docker Compose** (For containerization)

---

## **📄 License**

This project is licensed under the **MIT License**.

---

## **👨‍💻 Author**

**Bryan Gallo**  
🚀 Passionate about software development, technology, and innovation.
