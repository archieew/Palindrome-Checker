const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

checkButton.addEventListener("click",() => {
  if (textInput.value === "") {
    alert("Pleast input a value")
  }
});
