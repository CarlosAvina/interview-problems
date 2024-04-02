const input = [1, 1, 1];
const target = 5;

function getPossibleSubarrays(arr, target) {
  let posssibleSubarrays = 0;
  for (let i = 0; i < arr.length; i++) {
    let totalSum = 0;
    for (let j = i; j < arr.length; j++) {
      totalSum += arr[j];
      const subarrayLength = j - i + 1;
      const result = totalSum * subarrayLength;

      if (result < target) {
        posssibleSubarrays++;
      }
    }
  }
  return posssibleSubarrays;
}

console.log(getPossibleSubarrays(input, target));
