// implement map, filter, splice, slice, sort, reduce, some, find, findIndex
export function loadPolyfill() {
  Array.prototype.myMap = function (callback) {
    let newArray = [];

    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      const newItem = callback(item, i);
      newArray.push(newItem);
    }

    return newArray;
  };

  console.log(
    "my map: ",
    [1, 2, 3, 4, 5, 6].myMap((item, index) => item * index),
  );

  Array.prototype.myFilter = function (callback) {
    let newArray = [];

    for (let i = 0; i < this.length; i++) {
      const item = this[i];
      const shouldInclude = callback(item, i);

      if (shouldInclude) {
        newArray.push(item);
      }
    }

    return newArray;
  };
  console.log(
    "my filter: ",
    [1, 2, 3, 4, 5, 6, 7, 8, 9].myFilter((item) => item % 2 === 0),
  );

  Array.prototype.mySplice = function (start, count, replacement) {
    let c = 0;
    const shouldReplace = replacement !== undefined && c < count;
    for (let i = start; i < this.length; i++) {
      const nextIndex = i + count;
      const nextEl = this[nextIndex];

      if (nextEl === undefined) {
        delete this[i];
      } else {
        this[i] = shouldReplace ? replacement : this[nextIndex];
        c++;
      }
    }
    this.length = shouldReplace ? this.length : this.length - count;
  };
  const spliced = [1, 2, 3, 4, 5, 6];
  spliced.mySplice(2, 1, 0);
  console.log(spliced);
}
