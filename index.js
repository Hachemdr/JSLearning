class Book {
  constructor(title, author, pages, isRead = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, isRead = false) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  return newBook;
}

const firstBook = addBookToLibrary(
  "The Hobbit",
  "J.R.R. Tolkien",
  310,
  true
);

const secondBook = addBookToLibrary(
  "JavaScript: The Good Parts",
  "Douglas Crockford",
  172,
  false
);

console.log(myLibrary);
console.log(firstBook.id);
console.log(secondBook.id);
