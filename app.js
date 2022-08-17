const get = (el) => document.querySelector(el);

const contentEl = get("#content");
const searchContainer = get(".search");
const searchInput = get(".search-input");
const closeBtn = get(".search-close-btn");
let currentEl = get(".current");
let totalEl = get(".total");
let downBtn = get(".down-btn");
let upBtn = get(".up-btn");

let textCopy = contentEl.innerText;

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey === true && event.key.toLocaleLowerCase() == "m") {
    // Show the dialog and focus on it
    searchContainer.classList.remove("hide");
    searchContainer.classList.add("show");
    searchInput.focus();
  }
});

closeBtn.addEventListener("click", () => {
  searchContainer.classList.remove("show");
  searchContainer.classList.add("hide");
});

searchInput.addEventListener("input", (e) => {
  const search = e.target.value;

  if (search.length < 2) {
    currentEl.innerText = "-";
    totalEl.innerText = "-";
    return;
  }

  const regex = new RegExp(search, "gi");
  let id = 0;
  let newText = textCopy.replace(regex, (word) => {
    id += 1;
    return `<span id="${id}" class="keyword">${word}</span>`;
  });

  currentEl.innerText = id !== 0 ? 1 : "-";
  totalEl.innerText = id !== 0 ? id : "-";

  contentEl.innerHTML = newText;
});

downBtn.addEventListener("click", () => {
  let currentIdx = Number(currentEl.innerText);
  let maxIdx = Number(totalEl.innerText);

  if (currentIdx >= maxIdx) return;
  let nextIdx = currentIdx + 1;

  // Remove styling from previous elements
  document.getElementById(currentIdx).classList.remove("highlight");
  let keyword = document.getElementById(nextIdx);

  keyword.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });

  keyword.classList.add("highlight");

  currentEl.innerText = nextIdx;
});

upBtn.addEventListener("click", () => {
  let currentIdx = currentEl.innerText;

  if (currentIdx <= 1) return;
  let nextIdx = Number(currentIdx) - 1;

  currentEl.innerText = nextIdx;
});
