module.exports = (rows) => {
  const orase = [];
  const branduri = [];
  const tipuri_produse = [];

  const preturi = [];
  rows.forEach((product) => {
    preturi.push(parseFloat(product.pret));

    product.magazine_stoc.forEach((oras) => {
      if (oras && !orase.includes(oras)) orase.push(oras);
    });

    if (product.brand && !branduri.includes(product.brand)) branduri.push(product.brand);
    if (product.tip_produs && !tipuri_produse.includes(product.tip_produs)) tipuri_produse.push(product.tip_produs);
  });

  const pret_min = Math.min.apply(null, preturi);
  const pret_max = Math.max.apply(null, preturi);

  return { pret_min, pret_max, orase, branduri, tipuri_produse, notFound: false };
};
