const obj = {
  ip: {
    123: {
      samsung: "tv",
    },
    134: {
      apple: "iphone",
    },
  },
  search: {
    term: "banana",
  },
};

// breath first search
/* function convert2url(obj) {
  debugger;
  const q = [obj];

  while (q.length) {
    const curr = q.shift();

    if (!curr || typeof curr === "string") return;

    console.log(curr);

    Object.values(curr).forEach((value) => {
      q.push(value);
    });
  }
} */

// depth first search
function walk(current, path, arr) {
  if (typeof current === "string") {
    path.push(current);
    arr.push(path.join("/"));
    return;
  }

  const entries = Object.entries(current);
  entries.forEach(([key, value]) => {
    path.push(key);
    walk(value, path, arr);
    path.pop();
  });
  path.pop();
}
function convert2url(obj) {
  const str = [];
  const arr = [];

  walk(obj, str, arr);
  console.log({ str, arr });
}
convert2url(obj);
