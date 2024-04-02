class API {
  PAGE_SIZE = 10;
  apiResults;

  constructor() {
    this.apiResults = Array(1000)
      .fill(0)
      .map((_, idx) => idx + 1);
  }

  getPage(page) {
    if (page < 0) return [];
    if (!Number.isInteger(page)) return [];
    return this.apiResults.slice(
      this.PAGE_SIZE * page - this.PAGE_SIZE,
      this.PAGE_SIZE * page,
    );
  }
}

class FetchWrapper {
  fetch(numResults) {}
}

function expect(arg) {
  return {
    toBe(result) {
      if (Array.isArray(arg) && Array.isArray(result)) {
        if (arg.length !== result.length) return false;

        for (let i = 0; i < arg.length; i++) {
          if (arg[i] !== result[i]) return false;
        }

        return true;
      }

      if (arg === result) return true;
      return false;
    },
  };
}

const api = new API();
console.log(api.fetch(0));
console.log(api.fetch(1));
console.log(api.fetch(2));
console.log(api.fetch(3));

/* console.log(expect(2).toBe(2));
console.log(expect(1).toBe(2));
console.log(expect([1, 2, 3]).toBe([1, 2, 3]));
console.log(expect([]).toBe([]));
console.log(expect([2, 2, 3]).toBe([1, 2, 3]));
console.log(expect([]).toBe([1, 2, 3])); */
