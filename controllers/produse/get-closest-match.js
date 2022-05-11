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

/**
 *
 * @param {string} from stringul de comparat
 * @param {string} target stringul cu care se compara
 * @returns stringul initial daca difera cu mai mult de 2 caractere sau rezultatul altfel
 */
const closestMatch = function (from, target) {
  if (from.length === 0) return null;

  if (distance(from, target) <= 2) return target;

  return from;
};

module.exports = { closestMatch };
