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

function sortParam(way = 'asc') {
  let url = '';
  if (window.location.href.includes('&')) {
    if (!window.location.href.includes('&sort=')) {
      url = `${window.location.origin}/produse${window.location.search}&sort=${way}`;
    } else {
      let mid = window.location.href.slice(window.location.href.indexOf('&sort='));
      url = window.location.href.replace(mid, `&sort=${way}`);
    }
  } else {
    if (!window.location.href.includes('sort=')) {
      url = `${window.location.origin}/produse?sort=${way}`;
    } else {
      let mid = window.location.href.slice(window.location.href.indexOf('sort='));
      url = window.location.href.replace(mid, `sort=${way}`);
    }
  }

  window.location.href = url;
}

const sortCresc = document.querySelector('.sortCresc');
const sortDesc = document.querySelector('.sortDesc');

sortCresc.addEventListener('click', () => sortParam('asc'));
sortDesc.addEventListener('click', () => sortParam('dsc'));

// calculeaza suma tuturor preturilor
const calcSumaPreturi = () => {
  let sumaPreturi = 0;
  document.querySelectorAll('.pret-input').forEach((input) => (sumaPreturi += parseFloat(input.value)));

  const sumaPreturiContainer = document.createElement('div');
  const textContent = document.createTextNode(`Suma tuturor produselor: ${sumaPreturi}`);
  sumaPreturiContainer.appendChild(textContent);

  // stiluri
  sumaPreturiContainer.style.position = 'fixed';
  sumaPreturiContainer.style.bottom = '0px';
  sumaPreturiContainer.style.left = '0px';
  sumaPreturiContainer.style.display = 'block';
  sumaPreturiContainer.style.background = 'yellow';
  sumaPreturiContainer.style.padding = '10px 15px';
  sumaPreturiContainer.style.opacity = '1';
  sumaPreturiContainer.style.transition = 'opacity 2s';

  document.body.appendChild(sumaPreturiContainer);

  setTimeout(() => {
    sumaPreturiContainer.style.opacity = '0';
  }, 2000);
};
calcSumaPreturi();

function addToCart(id) {
  const productID = parseInt(id);
  const input = document.querySelector('#cantitate-prod-' + id);
  const cantitate = input.value ? parseInt(input.value) : 1;
  input.value = '';

  let cart = null;
  if (!localStorage.getItem('cart')) {
    cart = [{ productID, cantitate }];
  } else {
    cart = JSON.parse(localStorage.getItem('cart'));

    const getExistingProduct = cart.filter((e) => e.productID == productID);
    if (getExistingProduct.length) {
      let productIndex = null;
      cart.forEach((product, index) => {
        if (product.productID == getExistingProduct[0].productID) {
          productIndex = index;
          return;
        }
      });
      cart[productIndex].cantitate += cantitate;
    } else {
      cart.push({ productID, cantitate });
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}
document.querySelectorAll('.add-to-cart-btn').forEach((input) => {
  input.addEventListener('click', () => addToCart(input.dataset.productid));
});

// show remove from cart btn if item exists in cart
document.querySelectorAll('.remove-from-cart-btn').forEach((btn) => {
  let cart = null;
  if (JSON.parse(localStorage.getItem('cart'))) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  if (cart.filter((e) => e.productID == btn.dataset.productid).length) btn.classList.remove('d-none');

  btn.addEventListener('click', () => removeFromCart(btn.dataset.productid));
});

function removeFromCart(id) {
  let cart = null;
  if (JSON.parse(localStorage.getItem('cart'))) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  let indexToDelete = null;
  cart.forEach((prod, index) => {
    if (prod.productID == id) indexToDelete = index;
  });
  cart.splice(indexToDelete, 1);

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
}
