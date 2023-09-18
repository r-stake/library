const btnAddBook = document.querySelector(".add-book");
const myLibrary = [];

// Book object constructor
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

// Get user's input about the book, create a new book object and store it into the array
function addBookToLibrary() {
  const title = prompt("Enter the title of the book:");
  const author = prompt("Enter the name of the author:");
  const pages = prompt("Enter the number of pages:");
  const read = prompt("Have you read the book yet?")
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// Loop over the array and display each book
function displayBooks() {
  console.log(myLibrary);
  for (let i = 0; i < myLibrary.length; i++) {
    // Display the books title
    const bookCard = document.querySelector(`.books div:nth-of-type(${i + 1})`);
    const h3Element = document.createElement("h3");
    h3Element.textContent = myLibrary[i].title;
    bookCard.appendChild(h3Element);
    // Display the books author
    const paraAuthor = document.createElement("p");
    paraAuthor.textContent = `Author: ${myLibrary[i].author}`;
    bookCard.appendChild(paraAuthor);
    // Display number of pages
    const paraPages = document.createElement("p");
    paraPages.textContent = `Number of pages: ${myLibrary[i].pages}`;
    bookCard.appendChild(paraPages);
    // Display read status
    const paraRead = document.createElement("p");
    paraRead.textContent = myLibrary[i].read;
    bookCard.appendChild(paraRead);
  }
}

function createNewBookCard() {
  const booksGrid = document.querySelector(".books");
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  booksGrid.insertBefore(bookElement, btnAddBook);
}

const book1 = new Book("Stories of the Macabre", "H.P. Lovecraft", 158, "not read yet");
myLibrary.push(book1);

const book2 = new Book("Eisenhorn The Omnibus - Warhammer 40,000", "Dan Abnett", 944, "not read yet");
myLibrary.push(book2)


displayBooks();

btnAddBook.addEventListener("click", createNewBookCard);