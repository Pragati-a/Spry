
    const form = document.getElementById("certForm");
    const qrcodeContainer = document.getElementById("qrcode");
    const downloadBtn = document.getElementById("downloadBtn");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = document.getElementById("name").value;
      let role = document.getElementById("role").value;
      let duration = document.getElementById("duration").value;
      let certId = document.getElementById("certId").value;

      // Update preview
      document.getElementById("previewName").textContent = name;
      document.getElementById("previewRole").textContent = role;
      document.getElementById("previewDuration").textContent = duration;
      document.getElementById("previewCertId").textContent = certId;

      // Clear old QR
      qrcodeContainer.innerHTML = "";

      // Generate new QR
      new QRCode(qrcodeContainer, {
        text: `Certificate ID: ${certId} | Name: ${name}`,
        width: 120,
        height: 120
      });

      // Show download button
      downloadBtn.style.display = "block";
    });

    // Download PDF
    downloadBtn.addEventListener("click", function() {
      html2canvas(document.getElementById("certificate")).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("l", "mm", "a4"); // landscape
        const imgWidth = 280;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 20, imgWidth, imgHeight);
        pdf.save("certificate.pdf");
      });
    });
  

