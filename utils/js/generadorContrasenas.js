particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js@master/demo/particles.json');

function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const uppercase = document.getElementById('uppercase').checked;
  const lowercase = document.getElementById('lowercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;

  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()-_=+[]{};:,.<>?';

  if (!chars) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

document.getElementById('generate').addEventListener('click', () => {
  const pwd = generatePassword();
  document.getElementById('password').value = pwd;
});

document.getElementById('copy').addEventListener('click', () => {
  const pwd = document.getElementById('password').value;
  if (pwd) {
    navigator.clipboard.writeText(pwd);
    const copied = document.getElementById('copied');
    copied.style.display = 'block';
    setTimeout(() => copied.style.display = 'none', 1200);
  }
});