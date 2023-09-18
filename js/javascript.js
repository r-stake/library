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
  myLibrary.forEach(book => {
    console.log(book);
  });
}

const book1 = new Book("Stories of the Macabre", "H.P. Lovecraft", 158, "not read yet");
myLibrary.push(book1);

const book2 = new Book("Eisenhorn The Omnibus - Warhammer 40,000", "Dan Abnett", 944, "not read yet");
myLibrary.push(book2)


displayBooks();