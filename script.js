const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 60;

let painting = false;
let tool = "pen";
let history = [];
let startX, startY;
let textMode = false;

const colorPicker = document.getElementById("color");
const sizeSlider = document.getElementById("size");
const fontSelect = document.getElementById("fontSelect");
const uploadInput = document.getElementById("upload");
const posLabel = document.getElementById("position");

function saveState() {
  history.push(canvas.toDataURL());
  if (history.length > 20) history.shift();
}

function getXY(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
  const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
  return [x, y];
}

function drawShape(x1, y1, x2, y2) {
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = sizeSlider.value;
  if (tool === "rect") {
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  } else if (tool === "circle") {
    const r = Math.hypot(x2 - x1, y2 - y1);
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function startPosition(e) {
  painting = true;
  [startX, startY] = getXY(e);
  if (tool === "fill") {
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  } else if (tool === "pen" || tool === "eraser") {
    draw(e);
  }
}

function endPosition(e) {
  if (tool === "rect" || tool === "circle") {
    const [endX, endY] = getXY(e);
    drawShape(startX, startY, endX, endY);
  }
  painting = false;
  ctx.beginPath();
  saveState();
}

function draw(e) {
  if (!painting || (tool !== "pen" && tool !== "eraser")) return;
  ctx.lineWidth = sizeSlider.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = tool === "eraser" ? "#ffffff" : colorPicker.value;
  const [x, y] = getXY(e);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Update cursor position
canvas.addEventListener("mousemove", (e) => {
  const [x, y] = getXY(e);
  posLabel.innerText = `🖱️ (x: ${x}, y: ${y})`;
});

// Tools
document.getElementById("pen").onclick = () => tool = "pen";
document.getElementById("eraser").onclick = () => tool = "eraser";
document.getElementById("rect").onclick = () => tool = "rect";
document.getElementById("circle").onclick = () => tool = "circle";
document.getElementById("fill").onclick = () => tool = "fill";
document.getElementById("clear").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
};
document.getElementById("undo").onclick = () => {
  if (history.length > 0) {
    const img = new Image();
    img.src = history.pop();
    img.onload = () => ctx.drawImage(img, 0, 0);
  }
};
document.getElementById("save").onclick = () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};
document.getElementById("download").onclick = () => {
  const link = document.createElement("a");
  link.download = "drawing.jpg";
  link.href = canvas.toDataURL("image/jpeg");
  link.click();
};
document.getElementById("toggleTheme").onclick = () => {
  document.body.classList.toggle("dark");
};
document.getElementById("grid").onclick = () => {
  ctx.strokeStyle = "#ddd";
  for (let x = 0; x < canvas.width; x += 25) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 25) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
};

// Upload
uploadInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    saveState();
  };
  img.src = URL.createObjectURL(file);
});

// Text
document.getElementById("textTool").onclick = () => {
  textMode = true;
  alert("Click on canvas to type text");
};

canvas.addEventListener("click", (e) => {
  if (!textMode) return;
  const [x, y] = getXY(e);
  const text = prompt("Enter your text:");
  if (text) {
    ctx.fillStyle = colorPicker.value;
    ctx.font = `${sizeSlider.value * 2}px ${fontSelect.value}`;
    ctx.fillText(text, x, y);
    saveState();
  }
  textMode = false;
});

// Drawing Events
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);
