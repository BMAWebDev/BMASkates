const priceInput = document.querySelector('#price-filter-input');

priceInput.addEventListener('input', (e) => {
  document.querySelector('#price-range-val').textContent = `(${e.target.value})`;
});
