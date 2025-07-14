# 🖌️ DrawEase Pro – Ultimate Paint App

DrawEase Pro is a feature-rich and responsive paint app built using **HTML5 Canvas API** and other modern Web APIs. It allows users to sketch, draw shapes, add text, fill backgrounds, upload images, and download their creations – all directly in the browser!

---

## 🚀 Live Demo

🔗 **Netlify:** [draweaseprodarshan.netlify.app](https://draweaseprodarshan.netlify.app)

---

## 🌐 Web APIs Used

| Web API | How It’s Used |
|--------|----------------|
| **Canvas API** | Used for all drawing, shape rendering, background fill, text, and exporting images |
| **File API** | Loads uploaded images onto the canvas via `input type="file"` and `FileReader` |
| **DOM API** | Handles user interactions (button clicks, sliders, color pickers, etc.) and theme toggling |
| **Blob + URL.createObjectURL** | Allows exporting canvas content as PNG and JPG by converting canvas to Blob or Data URL |

---

## ✨ Features

- ✏️ **Pen Tool** – Freehand drawing with adjustable thickness and color  
- 🩹 **Eraser Tool** – Erase any portion of the drawing  
- ⬛ **Draw Shapes** – Draw Rectangles and Circles using mouse  
- 🅰️ **Add Text** – Click and type text in any font and color  
- 🎯 **Fill Background** – Fill entire canvas with a solid color  
- 🖼️ **Image Upload** – Import and draw on images directly  
- 📐 **Grid Lines** – Optional background grid for alignment  
- ↩️ **Undo** – Go back up to 20 previous drawing states  
- 🌗 **Theme Toggle** – Light/Dark mode support  
- 📍 **Cursor Position Tracker** – Live coordinate display  
- 💾 **Save as PNG** / 📥 **Export as JPG**

---

## 💻 Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**

---

## ⚠️ Known Limitations

- On **iOS Safari** and some older **macOS browsers**, features like file upload and download may have limitations due to platform restrictions.
- Canvas resolution and rendering might vary on high-DPI screens.

---

## 📂 How to Run Locally

```bash
git clone https://github.com/Darshanjain25933/draweasepro.git
cd draweasepro
open index.html
