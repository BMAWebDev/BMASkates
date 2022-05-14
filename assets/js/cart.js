if (!JSON.parse(localStorage.getItem('cart'))?.length) {
  document.querySelector('.cart-empty-container').classList.remove('d-none');
  document.querySelector('.cart').classList.add('d-none');
} else {
  const cart = JSON.parse(localStorage.getItem('cart'));

  const ids = [];
  cart.forEach((element) => {
    ids.push(element.productID);
  });

  const template = document.querySelector('.product-template');

  getProducts()
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const produse = json.produse;

      cartProducts = [];
      ids.forEach((id) => {
        const produs = produse.filter((e) => e.id == id)[0];
        const cantitate = cart.filter((e) => e.productID == id)[0].cantitate;
        cartProducts.push({ produs, cantitate });
      });

      let total = 0;
      cartProducts.forEach((product) => {
        total += parseInt(product.cantitate) * parseFloat(product.produs.pret);

        const item = template.content.cloneNode(true);
        const nume = item.querySelector('.nume');
        nume.textContent = product.produs.nume;

        const pret = item.querySelector('.pret');
        pret.textContent = product.produs.pret;

        const cantitate = item.querySelector('.cantitate');
        cantitate.textContent = product.cantitate;

        const brand = item.querySelector('.brand');
        brand.textContent = product.produs.brand;

        const tva = item.querySelector('.tva');
        tva.textContent = product.produs.tva ? 'Da' : 'Nu';

        const categorie = item.querySelector('.categorie');
        categorie.textContent = product.produs.categorie;

        const descriere = item.querySelector('.descriere');
        descriere.textContent = product.produs.descriere;

        const delete_product = item.querySelector('.delete-product');
        delete_product.setAttribute('data-productID', product.produs.id);

        delete_product.addEventListener('click', () => {
          const id = delete_product.dataset.productid;

          let indexToDelete = null;
          cart.forEach((prod, index) => {
            if (prod.productID == id) indexToDelete = index;
          });
          cart.splice(indexToDelete, 1);
          localStorage.setItem('cart', JSON.stringify(cart));

          if (!cart.length) localStorage.removeItem('cart');

          window.location.reload();
        });

        document.querySelector('.products').appendChild(item);
      });
      document.querySelector('.totals').querySelector('.pret').textContent = total;
    });
}

async function getProducts() {
  try {
    return await fetch(`${window.location.origin}/api/produse`);
  } catch (err) {
    console.log(err);
  }
}

document.querySelector('#buy-products').addEventListener('click', () => {
  buyProducts()
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      if (response.err) {
        alert('Trebuie sa fii conectat in cont pentru a putea cumpara din acest magazin');
      } else {
        console.log(response);
      }
    });
});

async function buyProducts() {
  try {
    return await fetch(`${window.location.origin}/api/cart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        produse: JSON.parse(localStorage.getItem('cart')),
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
