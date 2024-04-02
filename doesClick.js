const list = [2, 3, 5];
const target1 = 25; // true
const target2 = 12; // false
const target3 = 0; // false

function recursiveDoesClick(currentResult, list, target, index) {
  if (currentResult === target) return true;
  if (index === list.length) return false;

  const sumResult = currentResult + list[index];
  const productResult = currentResult * list[index];

  const isSumTargetReached = recursiveDoesClick(
    sumResult,
    list,
    target,
    index + 1,
  );
  const isProductTargetReached = recursiveDoesClick(
    productResult,
    list,
    target,
    index + 1,
  );

  return isSumTargetReached || isProductTargetReached;
}

function doesClick(list, target) {
  if (list.length === 0) return false;
  const current = list[0];
  return recursiveDoesClick(current, list, target, 1);
}

console.log(doesClick(list, target1));
console.log(doesClick(list, target2));
console.log(doesClick(list, target3));
