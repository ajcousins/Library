"usestrict";

const myLibrary = [];
const appBody = document.querySelector(".libraryBody");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const submitButton = document.querySelector(".submitButton");
const ghostBook = document.createElement("div")
        ghostBook.setAttribute("class", "book ghostBook");
        ghostBook.textContent = "+";
        ghostBook.addEventListener("click", function () {
            modalBg.classList.add("bg-active");
        })
        modalClose.addEventListener("click", function () {
            modalBg.classList.remove("bg-active");
        })

submitButton.addEventListener("click", function () {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = Number(document.querySelector("#pages").value);
    let isRead = document.querySelector("#readTrue").checked;
    addBookToLibrary(title, author, pages, isRead);
    // Reset modal fields
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#readTrue").checked = false;
    document.querySelector("#readFalse").checked = false;
    modalBg.classList.remove("bg-active");
});

// Constructor function
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.removeBook = function (index) {
    myLibrary.splice(index, 1);
    refreshDisplay();
}

Book.prototype.changeRead = function (index) {
    if (myLibrary[index].isRead === true) {
        myLibrary[index].isRead = false;
    } else {
        myLibrary[index].isRead = true;
    }
    refreshDisplay();
}

// Filler/ sample books:
myLibrary.push(new Book ("Lord of the Flies", "William Golding", 225, true));
myLibrary.push(new Book ("A Game of Thrones: A Song of Fire and Ice", "George R. R. Martin", 4659, false));
myLibrary.push(new Book ("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 512, true));
myLibrary.push(new Book ("1984 Nineteen Eighty-Four", "George Orwell", 384, true));
myLibrary.push(new Book ("A Brief History of Time", "Stephen Hawking", 242, true));

function addBookToLibrary (title, author, pages, isRead) {
    myLibrary.push(new Book (title, author, pages, isRead));
    appendToLibraryDisplay(myLibrary.length - 1);
}

// Refresh library display
function refreshDisplay() {
    while (document.querySelector(".book")) {
        appBody.removeChild(document.querySelector(".book"));
    }
    displayLibrary();
}

// Populate lbrary function
function displayLibrary () {
    for (let i = 0; i < myLibrary.length; i++) {
        createBook(i);
    }
    appBody.appendChild(ghostBook);
}

function appendToLibraryDisplay (index) {
    appBody.removeChild(ghostBook);
    createBook(index);
    appBody.appendChild(ghostBook);
}

function createBook (index) {
    let book = document.createElement("div")
        book.setAttribute("class", "book");
        appBody.appendChild(book);

        let title = document.createElement("h2")
        title.textContent = myLibrary[index].title;
        book.appendChild(title);
        book.appendChild(document.createElement("br"))

        let author = document.createElement("h3")
        author.textContent = `Written by ${myLibrary[index].author}`;
        book.appendChild(author);
        book.appendChild(document.createElement("br"))

        let pages = document.createElement("p")
        pages.textContent = `Pages: ${myLibrary[index].pages}`;
        book.appendChild(pages);

        let read = document.createElement("p")
        read.setAttribute("class", "link");
        read.setAttribute("id", `read_${index}`);
        read.addEventListener("click", function () {
            myLibrary[index].changeRead(index)
        });
        if (myLibrary[index].isRead === true) {
            read.textContent = "Read";
        } else {
            read.textContent = "Not read";
        }
        
        book.appendChild(read);

        let remove = document.createElement("p")
        remove.setAttribute("class", "link remove");
        remove.setAttribute("id", `index_${index}`);
        remove.addEventListener("click", function () {
            myLibrary[index].removeBook(index)
        });
        remove.textContent = "Remove Title?";
        book.appendChild(remove);
}

displayLibrary();