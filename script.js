const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("result");
const historyList = document.getElementById("history-list");

let history = [];

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

function showResult(text, isPal) {
  result.innerHTML = isPal
    ? `<span class="icon">✅</span> <span class="palindrome">${text} is a palindrome</span>`
    : `<span class="icon">❌</span> <span class="not-palindrome">${text} is not a palindrome</span>`;
  result.classList.remove("fade");
  void result.offsetWidth; // trigger reflow for animation
  result.classList.add("fade");
}

function addToHistory(text, isPal) {
  history.unshift({ text, isPal });
  if (history.length > 10) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = history
    .map(
      (item) =>
        `<li class="${item.isPal ? "palindrome" : "not-palindrome"}">
          <span class="icon">${item.isPal ? "✅" : "❌"}</span> ${item.text}
        </li>`
    )
    .join("");
}

function handleCheck() {
  const value = textInput.value.trim();
  if (!value) {
    result.innerHTML = '<span class="icon">⚠️</span> <span class="warning">Please input a value</span>';
    return;
  }
  const pal = isPalindrome(value);
  showResult(value, pal);
  addToHistory(value, pal);
}

function handleClear() {
  textInput.value = "";
  result.innerHTML = "";
  textInput.focus();
}

textInput.addEventListener("input", () => {
  if (textInput.value.trim() === "") {
    result.innerHTML = "";
    return;
  }
  const pal = isPalindrome(textInput.value);
  showResult(textInput.value, pal);
});

checkButton.addEventListener("click", handleCheck);
clearButton.addEventListener("click", handleClear);

// Optional: Enter key triggers check
textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCheck();
});
