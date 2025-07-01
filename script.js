const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "canvas",
  data: "https://example.com",
  image: "",
  dotsOptions: {
    color: "#ffffff",
    type: "rounded"
  },
  backgroundOptions: {
    color: "#111827",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10
  }
});

const dataInput = document.getElementById("data");
const errorCorrectionInput = document.getElementById("errorCorrection");
const sizeInput = document.getElementById("size");
const foregroundInput = document.getElementById("foreground");
const backgroundInput = document.getElementById("background");
const logoInput = document.getElementById("logo");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const lightExportBtn = document.getElementById("lightExport");
const qrCodeContainer = document.getElementById("qrcode");

qrCode.append(qrCodeContainer);

generateBtn.addEventListener("click", () => {
  const data = dataInput.value || "https://example.com";
  const ecLevel = errorCorrectionInput.value;
  const size = parseInt(sizeInput.value);
  const foreground = foregroundInput.value;
  const background = backgroundInput.value;

  let logoFile = logoInput.files[0];
  let logoURL = "";

  if (logoFile) {
    logoURL = URL.createObjectURL(logoFile);
  }

  qrCode.update({
    width: size,
    height: size,
    data: data,
    qrOptions: {
      errorCorrectionLevel: ecLevel
    },
    dotsOptions: {
      color: foreground
    },
    backgroundOptions: {
      color: background
    },
    image: logoURL
  });
});

downloadBtn.addEventListener("click", () => {
  qrCode.download({
    name: "qr-code",
    extension: "png"
  });
});

lightExportBtn.addEventListener("click", () => {
  const data = dataInput.value || "https://example.com";
  const ecLevel = errorCorrectionInput.value;
  const size = parseInt(sizeInput.value);

  qrCode.update({
    width: size,
    height: size,
    data: data,
    qrOptions: {
      errorCorrectionLevel: ecLevel
    },
    dotsOptions: {
      color: "#000000" // Black foreground for light version
    },
    backgroundOptions: {
      color: "#ffffff" // White background for light version
    }
  });

  qrCode.download({
    name: "qr-code-light",
    extension: "png"
  });

  // Then restore dark mode colors
  qrCode.update({
    dotsOptions: {
      color: foregroundInput.value
    },
    backgroundOptions: {
      color: backgroundInput.value
    }
  });
});
