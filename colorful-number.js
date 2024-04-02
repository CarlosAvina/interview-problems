function colorfulNumber(num) {
  const productMap = new Map();
  let substringLength = 1;
  const numAsString = String(num);

  while (substringLength <= numAsString.length) {
    for (let i = 0; i < numAsString.length; i++) {
      const substring = numAsString.slice(i, substringLength + i);

      if (substring.length === substringLength) {
        let product;

        for (let j = 0; j < substring.length; j++) {
          if (j === 0) {
            product = Number(substring[j]);
            continue;
          }

          product *= Number(substring[j]);
        }

        if (productMap.has(product)) {
          return false;
        } else {
          productMap.set(product, true);
        }
      }
    }

    substringLength++;
  }

  return true;
}

console.log(colorfulNumber(10));
console.log(colorfulNumber(326));
console.log(colorfulNumber(3245));
