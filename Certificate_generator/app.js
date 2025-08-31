
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      regenerateQR();
      updatePreview();
    });

    // Generate unique certificate ID
    function generateCertificateId() {
      const timestamp = new Date().getTime().toString().slice(-6);
      const random = Math.random().toString(36).substr(2, 4).toUpperCase();
      const certId = `CERT-2024-${timestamp}${random}`;
      document.getElementById('certificateId').textContent = certId;
      return certId;
    }

    // Format date for display
    function formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Update preview in real-time
    function updatePreview() {
      const name = document.getElementById('internName').value.trim() || 'Intern Name';
      const role = document.getElementById('internRole').value.trim() || 'Internship Role';
      const company = document.getElementById('companyName').value.trim() || 'Company Name';
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const achievement = document.getElementById('achievement').value.trim();

      document.getElementById('previewName').textContent = name;
      document.getElementById('previewRole').textContent = role;
      document.getElementById('previewCompany').textContent = company;
      document.getElementById('previewStartDate').textContent = formatDate(startDate);
      document.getElementById('previewEndDate').textContent = formatDate(endDate);

      const achievementElement = document.getElementById('previewAchievement');
      if (achievement) {
        achievementElement.innerHTML = `"${achievement}"`;
      } else {
        achievementElement.innerHTML = '';
      }
    }

    // Generate QR code
    function generateQRCode() {
      const certId = document.getElementById('certificateId').textContent;
      const verificationUrl = `https://verify.certifypro.com/certificate/${certId}`;

      document.getElementById('verificationUrl').textContent = verificationUrl;

      const qrContainer = document.getElementById('qrCode');
      qrContainer.innerHTML = '';

      const qr = qrcode(0, 'M');
      qr.addData(verificationUrl);
      qr.make();

      qrContainer.innerHTML = qr.createSvgTag({
        scalable: true,
        margin: 2,
        color: '#4b5563',
        background: '#ffffff',
      });
    }

    // Regenerate QR code with new ID
    function regenerateQR() {
      generateCertificateId();
      generateQRCode();
    }

    // Generate and download certificate as PDF
    function generateCertificate() {
      const element = document.getElementById('certificatePreview');
      const certificateId = document.getElementById('certificateId').textContent;

      const opt = {
        margin: 10,
        filename: `${certificateId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };

        