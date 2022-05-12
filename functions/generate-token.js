let sirAlphaNum = '';
const intervale = [
  [48, 57],
  [65, 90],
  [97, 122],
];

for (let interval of intervale) {
  for (let i = interval[0]; i <= interval[1]; i++) sirAlphaNum += String.fromCharCode(i);
}

module.exports = (lungime) => {
  sirAleator = '';

  for (let i = 0; i < lungime; i++) {
    sirAleator += sirAlphaNum[Math.floor(Math.random() * sirAlphaNum.length)];
  }

  return sirAleator;
};
