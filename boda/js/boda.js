document.addEventListener('DOMContentLoaded', () => {
  const btnEuro = document.getElementById('btn-euro');
  const btnCrypto = document.getElementById('btn-crypto');
  const donationArea = document.getElementById('donation-area');
  const euroContent = document.getElementById('euro-content');
  const cryptoContent = document.getElementById('crypto-content');

  function resetActive() {
    btnEuro.classList.remove('active');
    btnCrypto.classList.remove('active');
    euroContent.style.display = 'none';
    cryptoContent.style.display = 'none';
    donationArea.classList.remove('show');
  }

  if (btnEuro) {
    btnEuro.addEventListener('click', () => {
      resetActive();
      btnEuro.classList.add('active');
      donationArea.classList.add('show');
      euroContent.style.display = 'block';
      
      // Scroll suave
      setTimeout(() => {
        donationArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  }

  if (btnCrypto) {
    btnCrypto.addEventListener('click', () => {
      resetActive();
      btnCrypto.classList.add('active');
      donationArea.classList.add('show');
      cryptoContent.style.display = 'block';
      
      // Scroll suave
      setTimeout(() => {
        donationArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  }
});
