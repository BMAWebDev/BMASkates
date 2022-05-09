module.exports = (rows) => {
  // salvez intr-o variabila noua si nu in cea curenta
  // pentru ca am nevoie de o sortare locala,
  // nu direct pe randurile din query
  const products = rows;
  products.sort((a, b) => (parseFloat(a.pret) < parseFloat(b.pret) ? -1 : 1));

  const pret_min = products[0].pret; // primul sortat dupa pret
  const pret_max = products[products.length - 1].pret; // ultimul sortat dupa pret

  const orase = [];
  const branduri = [];
  const tipuri_produse = [];

  products.forEach((product) => {
    product.magazine_stoc.forEach((oras) => {
      if (oras && !orase.includes(oras)) orase.push(oras);
    });

    if (product.brand && !branduri.includes(product.brand)) branduri.push(product.brand);
    if (product.tip_produs && !tipuri_produse.includes(product.tip_produs)) tipuri_produse.push(product.tip_produs);
  });

  return { pret_min, pret_max, orase, branduri, tipuri_produse };
};
