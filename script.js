const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// Trigger conversion on Enter key in amount field
amountInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    convertBtn.click();
  }
});

// Load currency list
fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(data => {
    Object.entries(data).forEach(([code, name]) => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = code;
      option1.textContent = `${code} - ${name}`;
      option2.textContent = `${code} - ${name}`;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
  });

// Convert function
convertBtn.addEventListener('click', () => {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    resultText.textContent = "Choose different currencies.";
    return;
  }

  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      resultText.textContent = `${amount} ${from} = ${data.rates[to]} ${to}`;
    });
});
