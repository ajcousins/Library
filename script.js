"usestrict";

const myLibrary = [];
const appBody = document.querySelector(".libraryBody");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

//console.log(appBody);

// Constructor function
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Filler/ sample books:
myLibrary.push(new Book ("Lord of the Flies", "William Golding", 225, true));
myLibrary.push(new Book ("A Game of Thrones: A Song of Fire and Ice", "George R. R. Martin", 4659, false));
myLibrary.push(new Book ("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 512, true));
//myLibrary.push(new Book ("1984 Nineteen Eighty-Four", "George Orwell", 384, true));

function addBookToLibrary () {
    let title = prompt("Title?");
    let author = prompt("Author");
    let pages = prompt("Pages");
    let isRead = prompt("Read?");

    myLibrary.push(new Book (title, author, pages, isRead));

    
}

//addBookToLibrary();

//console.log(myLibrary);


// Populate lbrary function
function displayLibrary () {
    for (let i = 0; i < myLibrary.length; i++) {
        
        let book = document.createElement("div")
        book.setAttribute("class", "book");
        appBody.appendChild(book);

        let title = document.createElement("h2")
        title.textContent = myLibrary[i].title;
        book.appendChild(title);

        let author = document.createElement("h3")
        author.textContent = myLibrary[i].author;
        book.appendChild(author);
        book.appendChild(document.createElement("br"))

        let pages = document.createElement("p")
        pages.textContent = `Pages: ${myLibrary[i].pages}`;
        book.appendChild(pages);
    }
    
    let ghostBook = document.createElement("div")
        ghostBook.setAttribute("class", "book ghostBook");
        ghostBook.textContent = "+";
        ghostBook.addEventListener("click", function () {
            modalBg.classList.add("bg-active");
        })
        modalClose.addEventListener("click", function () {
            modalBg.classList.remove("bg-active");
        })
        
    appBody.appendChild(ghostBook);
}




displayLibrary();
