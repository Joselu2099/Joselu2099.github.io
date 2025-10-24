particlesJS.load('particles-js', 'https://cdn.jsdelivr.net/gh/VincentGarreau/particles.js@master/demo/particles.json');

function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function base64Decode(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return "Texto no válido para Base64";
  }
}
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, function(c){
    return String.fromCharCode(
      (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

document.getElementById('encrypt').addEventListener('click', () => {
  const text = document.getElementById('inputText').value;
  const method = document.getElementById('method').value;
  let result = '';
  if (method === 'b64') result = base64Encode(text);
  if (method === 'rot13') result = rot13(text);
  document.getElementById('outputText').value = result;
});

document.getElementById('decrypt').addEventListener('click', () => {
  const text = document.getElementById('inputText').value;
  const method = document.getElementById('method').value;
  let result = '';
  if (method === 'b64') result = base64Decode(text);
  if (method === 'rot13') result = rot13(text);
  document.getElementById('outputText').value = result;
});

document.getElementById('copyResult').addEventListener('click', () => {
  const result = document.getElementById('outputText').value;
  if (result) {
    navigator.clipboard.writeText(result);
    const copied = document.getElementById('copied');
    copied.style.display = 'block';
    setTimeout(() => copied.style.display = 'none', 1200);
  }
});