let exchangeRate = 0.22;
const plnInput = document.getElementById('pln');
const eurOutput = document.getElementById('eur');

async function fetchExchangeRate() {
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=PLN&symbols=EUR');
    const data = await res.json();
    exchangeRate = data.rates.EUR;
    localStorage.setItem('exchangeRate', exchangeRate);
  } catch {
    const cached = localStorage.getItem('exchangeRate');
    if (cached) exchangeRate = parseFloat(cached);
  }
}
function convert() {
  const pln = parseFloat(plnInput.value);
  if (!isNaN(pln)) {
    const eur = (pln * exchangeRate).toFixed(2);
    eurOutput.textContent = eur;
  } else {
    eurOutput.textContent = '0.00';
  }
}
plnInput.addEventListener('input', convert);
window.addEventListener('load', () => {
  fetchExchangeRate();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});