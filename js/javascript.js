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

Book.prototype.updateStatus = function(index) {
  if (this.status === "read") {
    this.status = "not read"
  } else {
    this.status = "read"
  }
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
    // Remove previous entries from the card
    const bookCard = document.querySelector(`.books div:nth-of-type(${i + 1})`);
    while (bookCard.firstChild) {
      bookCard.removeChild(bookCard.firstChild);
    }
    // Set index number from the array as the data attribute of the book card
    bookCard.setAttribute("data-index", i);
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
    // Add a div for the buttons
    const divButtons = document.createElement("div");
    divButtons.classList.add("controls");
    bookCard.appendChild(divButtons);
    // Add change status button
    const btnChangeStatus = document.createElement("button");
    if (myLibrary[i].status === "read") {
      btnChangeStatus.classList.add("change-status", "read");
    } else {
      btnChangeStatus.classList.add("change-status", "not-read");
    }
    btnChangeStatus.innerHTML = "Update status";
    divButtons.appendChild(btnChangeStatus);
    // Add a "remove" button
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("remove-book");
    btnRemove.innerHTML = `<i class="bi bi-x-lg"></i>`
    divButtons.appendChild(btnRemove);
  }
}

// Creates a new book card
function createNewBookCard() {
  const booksGrid = document.querySelector(".books");
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  booksGrid.insertBefore(bookElement, btnAddBook);
}

// Remove book from the array
function removeBookFromArray(attribute) {
  myLibrary.splice(attribute, 1);
}

// Add event listener for buttons
function addEventListenersForRemovingBook() {
  const btnAllRemoveBook = document.querySelectorAll(".remove-book");
  // Listen for events
  btnAllRemoveBook.forEach(button => {
    button.addEventListener("click", function(event) {
      // Access relevant parent div and get data value
      const currentCard = event.currentTarget.parentNode.parentNode;
      const currentCardIndex = currentCard.getAttribute("data-index");
      // Remove book entry from the array
      removeBookFromArray(currentCardIndex);
      // Remove book card from the grid
      currentCard.remove();
      // Display updated array of books
      displayBooks();
      // Update event listener list
      addEventListenersForRemovingBook();
      addEventListenersForUpdatingStatus();
    });
  });
}

function addEventListenersForUpdatingStatus() {
  const btnAllUpdateStatus = document.querySelectorAll(".change-status");
  // Listen for events
  btnAllUpdateStatus.forEach(button => {
    button.addEventListener("click", function(event) {
      const currentCard = event.currentTarget.parentNode.parentNode;
      const currentCardIndex = currentCard.getAttribute("data-index");
      // Update array elements status
      myLibrary[currentCardIndex].updateStatus();
      // Display updated array of books
      displayBooks();
      // Update event listener list
      addEventListenersForRemovingBook();
      addEventListenersForUpdatingStatus();
    })
  })
}

// Reset form input fields
function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("status").checked = false;
}

const book1 = new Book("Stories of the Macabre", "H.P. Lovecraft", 158, "not read");
myLibrary.push(book1);

const book2 = new Book("Eisenhorn The Omnibus - Warhammer 40,000", "Dan Abnett", 944, "not read");
myLibrary.push(book2);


displayBooks();


btnAddBook.addEventListener("click", () => {
  newBookDialog.style.display = "block";
});


btnSubmitDialog.addEventListener("click", () => {
  // Get input values from the form
  const userInputTitleValue = document.getElementById("title").value;
  const userInputAuthorValue = document.getElementById("author").value;
  const userInputPagesValue = document.getElementById("pages").value;
  const userInputStatusCheckbox = document.getElementById("status");
  let userInputStatusValue;
  // set
  if (userInputStatusCheckbox.checked === true) {
    userInputStatusValue = "read";
  } else {
    userInputStatusValue = "not read"
  };

  if (userInputTitleValue && userInputAuthorValue && userInputPagesValue) {
    // Create a new card and display book information
    createNewBookCard();
    addBookToLibrary(userInputTitleValue, userInputAuthorValue, userInputPagesValue, userInputStatusValue);
    displayBooks();
    addEventListenersForRemovingBook();
    addEventListenersForUpdatingStatus();
    resetForm();
    newBookDialog.style.display = "none"
  }
});

btnCloseDialog.addEventListener("click", () => {
  resetForm();
  newBookDialog.style.display = "none"
});


addEventListenersForRemovingBook();
addEventListenersForUpdatingStatus();