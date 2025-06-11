//THIS IS A JS FILE FOR GENERATING PASSWORDS OF SUITABLE LENGTH AND CHARACTER TYPES (SMALL ALPHS,CAPITAL ALPHS,NUMBERS,SPECIAL CHARACTERS) AND ALSO STORING THE PASSWORDS WITH SUITABLE KEYS IN A ARRAY

const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");
const symbols = "!@#$%^&*()_+[]{}<>?/|".split("");


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
      "Please enter the password length more than or equal to 4";
    return;
  }
  let lowercaseCount = "", numberCount = "", symbolCount = "", uppercaseCount = "";
  // Check which character sets are selected
  const useLowercase = document.getElementById("useLowercase").checked;
  const useUppercase = document.getElementById("useUppercase").checked;
  const useNumbers = document.getElementById("useNumbers").checked;
  const useSymbols = document.getElementById("useSymbols").checked;

  let part = length / 4;
  let remainder = length % 4; //can be 1,2,3

  if (useLowercase) {
     lowercaseCount = getRandomChar(
      (remainder > 0 ? 1 : 0) + part,
      lowercase
    );
  } //beacuse we want to add value to part only if it is more than 0
  if (useUppercase) {
     uppercaseCount = getRandomChar(
      (remainder > 1 ? 1 : 0) + part,
      uppercase
    );
  } //becuse we want to add value to part only if it is more than 1
  if (useNumbers) {
     numberCount = getRandomChar((remainder > 2 ? 1 : 0) + part, numbers);
  } //becuse we want to add value to part only if it is more than 2 i.e 3
  if (useSymbols) {
    symbolCount = getRandomChar(part, symbols);
  }

  password += lowercaseCount + numberCount + symbolCount + uppercaseCount;
  result.textContent = password;
  // console.log(length)
}
// generatePasswrod(length);
// console.log(password)
