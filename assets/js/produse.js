const nameInput = document.querySelector('#search-name-filter-input');
const priceInput = document.querySelector('#price-filter-input');
const categorieInput = document.querySelector('#categorie-filtru-input');
const descriereInput = document.querySelector('#descriere-filtru-input');
const oraseInput = document.querySelectorAll('.oras-filter-input');
const brandSelect = document.querySelector('#brand-filtru-input');
const tipuriSelect = document.querySelector('#tipuri-produse-filtru-input');

priceInput.addEventListener('input', (e) => {
  document.querySelector('#price-range-val').textContent = `(${e.target.value})`;
});

oraseInput[0].addEventListener('click', () => {
  for (let i = 1; i < oraseInput.length; i++) oraseInput[i].checked = false;
});

oraseInput.forEach((input) => {
  input.addEventListener('click', () => {
    if (input.value) {
      oraseInput[0].checked = false;
    }

    if (input.nextElementSibling) input.nextElementSibling.classList.toggle('d-none');
  });
});

function getFilterQuery() {
  let path = '/produse';
  let params = [];
  if (nameInput.value.trim()) params.push(`nume=${nameInput.value.trim().replaceAll(' ', '-')}`);
  if (priceInput.value) params.push(`pret=${priceInput.value}`);
  if (categorieInput.value) params.push(`categorie=${categorieInput.value}`);
  if (descriereInput.value.trim()) params.push(`descriere=${descriereInput.value.trim().replaceAll(' ', '-')}`);

  const oraseSelectate = [];
  oraseInput.forEach((input) => {
    if (input.checked) {
      oraseSelectate.push(input.value);
    }
  });

  if (oraseSelectate.length == 1 && !oraseSelectate[0]) {
    params.push('oras=toate');
  } else {
    const orasQuery = [];
    oraseSelectate.forEach((oras) => {
      let tva = false;
      tva = document.querySelector(`input[name="tva_${oras}"]`).checked; //true daca tva_inclus este bifat, false altfel
      orasQuery.push(`${oras}_tva=${tva ? 'da' : 'nu'}`);
    });
    params.push(`magazine_stoc=${orasQuery.join('|')}`);
  }

  const stocInput = document.querySelector('input[name="disponibilitate"]:checked');
  if (stocInput.value) params.push(`in_stoc=${stocInput.value == 'in_stoc' ? 'da' : 'nu'}`);
  else params.push('in_stoc=toate');

  if (brandSelect.value) params.push(`brand=${brandSelect.value}`);

  const tipuri = [];
  Array.from(tipuriSelect.options).forEach((option) => {
    if (option.selected) tipuri.push(option.value);
  });
  if (tipuri.length) {
    const tipuriQuery = [];
    tipuri.forEach((tip) => {
      tipuriQuery.push(tip);
    });
    params.push(`tip_produs=${tipuriQuery[0] != '' ? tipuriQuery.join('|') : 'toate'}`);
  }

  const cantitateInput = document.querySelector('input[name="cantitate"]:checked');
  if (cantitateInput.value) params.push(`cantitate=${cantitateInput.value == 'suficienta' ? 'suficienta' : 'limitata'}`);
  else params.push('cantitate=toate');

  return `${path}?${params.join('&')}`;
}

const btnFilter = document.querySelector('.filtreaza');
btnFilter.addEventListener('click', () => {
  const query = getFilterQuery();
  window.location.href = `${window.location.origin}${query}`;
});

function resetFilters() {
  window.location.href = `${window.location.origin}/produse`;
}
const btnReset = document.querySelector('.reseteaza');
btnReset.addEventListener('click', resetFilters);
