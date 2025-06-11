// Caesar Cipher encryption
function caesarEncrypt(text, shift = 3) {
  return text.split('').map(char => {
    let code = char.charCodeAt(0);

    if (code >= 65 && code <= 90)
      return String.fromCharCode(((code - 65 + shift) % 26) + 65); // A-Z

    else if (code >= 97 && code <= 122)
      return String.fromCharCode(((code - 97 + shift) % 26) + 97); // a-z

    // Numbers and symbols unchanged
    return char;
  }).join('');
}

// Caesar Cipher decryption
function caesarDecrypt(text, shift = 3) {
  return caesarEncrypt(text, 26 - shift);
}

// Character sets
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");
const symbols = "!@#$%^&*()_+[]{}<>?/|".split("");

// Tab switcher
function showTab(tab) {
  document.getElementById('generate-tab').style.display = tab === 'generate' ? 'block' : 'none';
  document.getElementById('fetch-tab').style.display = tab === 'fetch' ? 'block' : 'none';
}

let generate = document.querySelector("#generate");
let result = document.querySelector("#result");
generate.addEventListener("click", generatePassword);

function getRandomChar(count, charSet) {
  let result = "";
  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * charSet.length);
    result += charSet[randomIndex];
  }
  return result;
}

function generatePassword() {
  let password = "";
  const length = parseInt(document.getElementById("length").value);
  if (isNaN(length) || length < 4) {
    result.textContent =
      "Please enter the passoword length more than or equal to 4";
    return;
  }

  let lowercaseCount = "", numberCount = "", symbolCount = "", uppercaseCount = "";

  // Check which character sets are selected
  const useLowercase = document.getElementById("useLowercase").checked;
  const useUppercase = document.getElementById("useUppercase").checked;
  const useNumbers = document.getElementById("useNumbers").checked;
  const useSymbols = document.getElementById("useSymbols").checked;

  let part = Math.floor(length / 4);
  let remainder = length % 4;

  if (useLowercase) {
    lowercaseCount = getRandomChar((remainder > 0 ? 1 : 0) + part, lowercase);
  }
  if (useUppercase) {
    uppercaseCount = getRandomChar((remainder > 1 ? 1 : 0) + part, uppercase);
  }
  if (useNumbers) {
    numberCount = getRandomChar((remainder > 2 ? 1 : 0) + part, numbers);
  }
  if (useSymbols) {
    symbolCount = getRandomChar(part, symbols);
  }

  password += lowercaseCount + numberCount + symbolCount + uppercaseCount;
  result.textContent = password;

  if (document.getElementById("savePassword").checked) {
    const key = document.getElementById("keyName").value.trim();
    if (key === "") {
      alert("Enter a key to save the password (e.g., Gmail, Instagram)");
      return;
    }

    // Encrypt before storing
    const encryptedPassword = caesarEncrypt(password);
    localStorage.setItem(key, encryptedPassword);
    alert(`Password saved for "${key}"`);
  }
}

// Fetch password function
function fetchPassword() {
  const key = document.getElementById("fetchKey").value.trim();
  const value = localStorage.getItem(key);
  const output = document.getElementById("fetchedResult");

  if (value) {
    const decrypted = caesarDecrypt(value);
    output.textContent = `Password for "${key}": ${decrypted}`;
  } else {
    output.textContent = `No password found for "${key}".`;
  }
}
