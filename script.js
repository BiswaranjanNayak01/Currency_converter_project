const host = "api.frankfurter.app";

// console.log(x);
// function drawGame() {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   fetch(`https://${host}/latest?amount=10&from=USD&to=INR`)
//     .then((resp) => resp.json())
//     .then((data) => {
//       alert(`10 USD = ${data.rates.INR} INR`);
//     });
// }

// drawGame();
// const BASE_URL =
// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // if (select.name === "from" && currCode === "USD") {
    //   newOption.selected = "selected";
    // } else if (select.name === "to" && currCode === "INR") {
    //   newOption.selected = "selected";
    // }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  const URL1 = `https://${host}/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  console.log(URL1);
  let response = await fetch(URL1);
  let data = await response.json();
  // let rate = data[toCurr.value.toUpperCase()];
  // const currency=data.rates.INR;
  const currency=data.rates[toCurr.value];

  let finalAmount =currency;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
