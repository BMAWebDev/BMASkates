const { closestMatch } = require('./get-closest-match');

const customSort = (queriedProducts, way = 'asc') => {
  return queriedProducts.sort((a, b) => {
    if (way == 'asc') {
      const first = parseInt(a.cantitate) / parseFloat(a.pret);
      const second = parseInt(b.cantitate) / parseFloat(b.pret);

      if (first > second) {
        return 1;
      } else if (first == second) {
        if (a.tip_produs.localeCompare(b.tip_produs)) return 1;

        return -1;
      }
    } else if (way == 'dsc') {
      const first = parseInt(a.cantitate) / parseFloat(a.pret);
      const second = parseInt(b.cantitate) / parseFloat(b.pret);

      if (first < second) {
        return 1;
      } else if (a.tip_produs.localeCompare(b.tip_produs)) return -1;

      return 1;
    }
    return -1;
  });
};

module.exports = (url, products) => {
  const params = url[1].split('&');

  const productNames = [];
  products.forEach((product) => {
    if (!productNames.includes(product.nume)) productNames.push(product.nume);
  });

  let queriedProducts = products;
  params.forEach((param) => {
    const filter = param.split('=');

    if (filter[0] == 'nume' && filter[1] != 'toate') {
      let name = filter[1].replaceAll('-', ' ');
      products.forEach((product) => {
        const res = closestMatch(name, product.nume);
        if (res == product.nume) {
          name = res;
          return; //break out of foreach
        } else if (product.nume.toLowerCase().includes(res.toLowerCase())) {
          name = product.nume;
          return; //break out of foreach
        }
      });

      if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.nume == name);
      else return;
    } else if (filter[0] == 'pret' && filter[1] != 'toate') {
      if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => parseFloat(e.pret) <= parseFloat(filter[1]));
      else return;
    } else if (filter[0] == 'categorie' && filter[1] != 'toate') {
      if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.categorie == filter[1]);
      else return;
    } else if (filter[0] == 'descriere' && filter[1] != 'toate') {
      if (queriedProducts.length) {
        const filterDescription = filter[1].toLowerCase().replaceAll('-', ' ');
        queriedProducts = queriedProducts.filter((e) => e.descriere.toLowerCase().replaceAll('-', ' ').includes(filterDescription));
      } else return;
    } else if (filter[0] == 'magazine_stoc' && filter[1] != 'toate') {
      const elements = param.slice(14).split('|');

      const optiuni = [];
      elements.forEach((element) => {
        optiuni.push({ oras: element.split('_')[0], tva: element.split('_')[1] == 'tva=da' ? true : false });
      });

      if (queriedProducts.length)
        optiuni.forEach((optiune) => {
          if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.magazine_stoc.includes(optiune.oras) && e.tva == optiune.tva);
        });
    } else if (filter[0] == 'in_stoc' && filter[1] != 'toate') {
      if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.in_stoc == (filter[1] == 'da' ? true : false));
      else return;
    } else if (filter[0] == 'brand' && filter[1] != 'toate') {
      if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.brand == filter[1].replaceAll('-', ' '));
      else return;
    } else if (filter[0] == 'tip_produs' && filter[1] != 'toate') {
      if (queriedProducts.length)
        filter[1].split('|').forEach((tip) => {
          if (queriedProducts.length) queriedProducts = queriedProducts.filter((e) => e.tip_produs == tip);
          else return;
        });
      else return;
    } else if (filter[0] == 'cantitate' && filter[1] != 'toate') {
      if (queriedProducts.length) {
        if (filter[1] == 'suficienta') {
          queriedProducts = queriedProducts.filter((e) => e.cantitate > 20 && e.in_stoc);
        } else {
          queriedProducts = queriedProducts.filter((e) => e.cantitate <= 20 && e.in_stoc);
        }
      } else return;
    } else if (filter[0] == 'sort') {
      queriedProducts = customSort(queriedProducts, filter[1]);
    }
  });

  return queriedProducts;
};
