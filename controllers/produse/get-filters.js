module.exports = (rows) => {
  rows.sort((a, b) => (parseFloat(a.pret) < parseFloat(b.pret) ? -1 : 1));

  const pret_min = rows[0].pret; // primul sortat dupa pret
  const pret_max = rows[rows.length - 1].pret; // ultimul sortat dupa pret

  const orase = [];
  const branduri = [];
  const tipuri_produse = [];

  rows.forEach((product) => {
    product.magazine_stoc.forEach((oras) => {
      if (oras && !orase.includes(oras)) orase.push(oras);
    });

    if (product.brand && !branduri.includes(product.brand)) branduri.push(product.brand);
    if (product.tip_produs && !tipuri_produse.includes(product.tip_produs)) tipuri_produse.push(product.tip_produs);
  });

  return { pret_min, pret_max, orase, branduri, tipuri_produse, notFound: false };
};
