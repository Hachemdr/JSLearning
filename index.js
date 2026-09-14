class Book {
  constructor(title, author, pages, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderLibrary();
}

function createBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  return book;
}

function renderLibrary() {
  const library = document.querySelector("#library");

  if (!library) return;

  library.innerHTML = "";

  if (myLibrary.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "Your library is empty. Add your first book!";
    library.appendChild(emptyState);
    return;
  }

  myLibrary.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";
    card.dataset.id = book.id;

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;

    const meta = document.createElement("div");
    meta.className = "book-meta";

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;

    const status = document.createElement("span");
    status.className = `status ${book.read ? "read" : "unread"}`;
    status.textContent = book.read ? "Read" : "Not read";

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "toggle-btn";
    toggleBtn.textContent = book.read ? "Mark unread" : "Mark read";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      renderLibrary();
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        renderLibrary();
      }
    });

    actions.append(toggleBtn, removeBtn);
    meta.append(pages, status);
    card.append(title, author, meta, actions);
    library.appendChild(card);
  });
}

const dialog = document.querySelector("#bookDialog");
const newBookBtn = document.querySelector("#newBookBtn");
const closeDialogBtn = document.querySelector("#closeDialogBtn");
const cancelFormBtn = document.querySelector("#cancelFormBtn");
const bookForm = document.querySelector("#bookForm");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

function closeDialog() {
  dialog.close();
  bookForm.reset();
}

closeDialogBtn.addEventListener("click", closeDialog);
cancelFormBtn.addEventListener("click", closeDialog);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const pages = Number(document.querySelector("#pages").value);
  const read = document.querySelector("#read").checked;

  if (!title || !author || !pages || pages <= 0) {
    return;
  }

  createBook(title, author, pages, read);
  closeDialog();
});

createBook("The Hobbit", "J.R.R. Tolkien", 310, true);
createBook("Pride and Prejudice", "Jane Austen", 432, false);
createBook("The Alchemist", "Paulo Coelho", 208, true);
