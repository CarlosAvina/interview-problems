export default class Trie {
  root;

  constructor() {
    this.root = this.createNode();
  }

  insert(item) {
    let node = this.root;
    for (let i = 0; i < item.length; i++) {
      const char = item[i];
      if (!node.children[char]) {
        node.children[char] = this.createNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
  }
  delete(item) {
    let node = this.root;
    let lastWord = null;
    let lastWordIndex = 0;

    for (let i = 0; i < item.length; i++) {
      const char = item[i];

      if (!char) return;

      if (node.isWord) {
        lastWord = node.children[char];
        lastWordIndex = i;
      }

      node = node.children[char];
    }

    const isLastNode = Object.keys(node.children).length === 0;
    if (!isLastNode) {
      node.isWord = false;
      return;
    }

    if (isLastNode && !lastWord) {
      const firstLetter = item[0];
      delete this.root.children[firstLetter];
      return;
    }

    if (isLastNode && lastWord) {
      const nextLetter = item[lastWordIndex + 1];
      delete lastWord.children[nextLetter];
    }
  }
  find(partial) {
    // if (!partial) return [];

    let node = this.root;
    for (let i = 0; i < partial.length; i++) {
      const char = partial[i];
      node = node.children[char];

      if (!node) return [];
    }

    let path = [];
    let words = [];

    this.traverseTree(node, path, words, partial);

    return words;
  }

  createNode() {
    return { children: {}, isWord: false };
  }
  traverseTree(node, path, words, partial) {
    if (!node) {
      const word = partial + path.join("");
      words.push(word);
      return;
    }

    if (node.isWord) {
      const word = partial + path.join("");
      words.push(word);
    }

    const entries = Object.entries(node.children);
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      path.push(key);
      this.traverseTree(value, path, words, partial);
      path.pop();
    }

    path.pop();
  }
}

export function loadAutocomplete() {
  document.querySelector("#app").innerHTML = `
      <form>
          <input name="search" type ="text" /> 
          <button type="submit">Save word</button>
          <div id="results"></div>
      </form>
   `;

  const form = document.querySelector("form");
  const input = document.querySelector("input");

  const trie = new Trie();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { search } = event.currentTarget;
    console.log(search, search.value);
    trie.insert(search.value);
  });

  input.addEventListener("input", (event) => {
    const value = event.currentTarget.value;
    const results = trie.find(value);
    console.log({ results, value, trie });
    document.getElementById("results").innerText = JSON.stringify(results);
  });
}
