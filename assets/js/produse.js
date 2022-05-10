const nameInput = document.querySelector('#search-name-filter-input');
const priceInput = document.querySelector('#price-filter-input');
const categorieInput = document.querySelector('#categorie-filtru-input');
const descriereInput = document.querySelector('#descriere-filtru-input');
const oraseInput = document.querySelectorAll('.oras-filter-input');
const disponibilitateInput = document.querySelector('#disponibilitate_toate-filtru-input');
const brandSelect = document.querySelector('#brand-filtru-input');
const tipuriSelect = document.querySelector('#tipuri-produse-filtru-input');

priceInput.addEventListener('input', (e) => {
  document.querySelector('#price-range-val').textContent = `(${e.target.value})`;
});

oraseInput.forEach((input) => {
  input.addEventListener('click', () => {
    if (input.nextElementSibling) input.nextElementSibling.classList.toggle('d-none');
  });
});

function resetFilters() {
  nameInput.value = '';
  priceInput.value = priceInput.min;
  categorieInput.value = '';
  descriereInput.value = '';

  oraseInput.forEach((oras) => (oras.value ? (oras.checked = false) : (oras.checked = true)));
  disponibilitateInput.checked = true;
  Array.from(brandSelect.options).forEach((option) => (option.value ? '' : (option.selected = true)));
  Array.from(tipuriSelect.options).forEach((option) => (option.value ? (option.selected = false) : (option.selected = true)));
}

document.querySelector('.reseteaza').addEventListener('click', resetFilters);

// algoritm copiat de pe net, aia e
const distance = function (a, b) {
  let _a;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  if (a.length > b.length) (_a = [b, a]), (a = _a[0]), (b = _a[1]);
  let row = [];
  for (let i = 0; i <= a.length; i++) row[i] = i;
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      let val = void 0;
      if (b.charAt(i - 1) === a.charAt(j - 1)) val = row[j - 1];
      else val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
};

const closestMatch = function (from, target) {
  if (from.length === 0) return null;

  if (distance(from, target) <= 2) return target;

  return from;
};
// closestMatch('saavrina', 'savarina')
