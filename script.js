const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "canvas",
  data: "https://github.com",
  qrOptions: {
    errorCorrectionLevel: "M",
  },
  dotsOptions: {
    color: "#000000", // default foreground black
    type: "rounded"
  },
  backgroundOptions: {
    color: "#ffffff", // default background white
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 8
  }
});

const qrContainer = document.getElementById("qrcode");
qrCode.append(qrContainer);

const dataInput = document.getElementById("data");
const errorCorrectionInput = document.getElementById("errorCorrection");
const sizeInput = document.getElementById("size");
const foregroundInput = document.getElementById("foreground");
const backgroundInput = document.getElementById("background");
const logoInput = document.getElementById("logo");
const downloadButton = document.getElementById("download");

function updateQRCode() {
  const data = dataInput.value || " ";
  const errorCorrectionLevel = errorCorrectionInput.value;
  const size = Math.max(100, parseInt(sizeInput.value) || 300);
  const foregroundColor = foregroundInput.value || "#000000";
  const backgroundColor = backgroundInput.value || "#ffffff";

  qrCode.update({
    width: size,
    height: size,
    data: data,
    qrOptions: { errorCorrectionLevel },
    dotsOptions: { color: foregroundColor },
    backgroundOptions: { color: backgroundColor },
  });
}

[dataInput, errorCorrectionInput, sizeInput, foregroundInput, backgroundInput].forEach(input => {
  input.addEventListener("input", () => {
    updateQRCode();
  });
});

logoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) {
    qrCode.update({ image: "" });
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    qrCode.update({ image: reader.result });
  };
  reader.readAsDataURL(file);
});

downloadButton.addEventListener("click", () => {
  qrCode.download({ name: "qr-code", extension: "png" });
});

// Initial generation
updateQRCode();
