const newBookDialog = document.getElementById("new-book-dialog");
const btnAddBook = document.querySelector(".add-book");
const btnCloseDialog = document.getElementById("close-dialog");
const btnSubmitDialog = document.getElementById("submit-dialog");
const myLibrary = [];

// Book object constructor
function Book(title, author, pages, status) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status
}

// Get user's input about the book, create a new book object and store it into the array
function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

// Loop over the array and display each book
function displayBooks() {
  console.log(myLibrary);
  for (let i = 0; i < myLibrary.length; i++) {
    // Remove previous entries
    const bookCard = document.querySelector(`.books div:nth-of-type(${i + 1})`);
    while (bookCard.firstChild) {
      bookCard.removeChild(bookCard.firstChild);
    }
    // Display the books title
    const h4Element = document.createElement("h4");
    h4Element.textContent = myLibrary[i].title;
    bookCard.appendChild(h4Element);
    // Display the books author
    const paraAuthor = document.createElement("p");
    paraAuthor.textContent = `Author: ${myLibrary[i].author}`;
    bookCard.appendChild(paraAuthor);
    // Display number of pages
    const paraPages = document.createElement("p");
    paraPages.textContent = `Number of pages: ${myLibrary[i].pages}`;
    bookCard.appendChild(paraPages);
    // Display read status
    const paraStatus = document.createElement("p");
    paraStatus.textContent = `Status: ${myLibrary[i].status}`;
    bookCard.appendChild(paraStatus);
  }
}

// Creates a new book card
function createNewBookCard() {
  const booksGrid = document.querySelector(".books");
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  booksGrid.insertBefore(bookElement, btnAddBook);
}

const book1 = new Book("Stories of the Macabre", "H.P. Lovecraft", 158, "not read");
myLibrary.push(book1);

const book2 = new Book("Eisenhorn The Omnibus - Warhammer 40,000", "Dan Abnett", 944, "not read");
myLibrary.push(book2);


displayBooks();


btnAddBook.addEventListener("click", () => {
  newBookDialog.showModal();
});

btnSubmitDialog.addEventListener("click", () => {
  const userInputTitle = document.getElementById("title").value;
  const userInputAuthor = document.getElementById("author").value;
  const userInputPages = document.getElementById("pages").value;
  const statusCheckbox = document.getElementById("status");
  let userInputStatus;
  if (statusCheckbox.checked) {
    userInputStatus = "read";
  } else {
    userInputStatus = "not read"
  };

  createNewBookCard();
  addBookToLibrary(userInputTitle, userInputAuthor, userInputPages, userInputStatus)
  displayBooks();
});

btnCloseDialog.addEventListener("click", () => {
  newBookDialog.close();
});