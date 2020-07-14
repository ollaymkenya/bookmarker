//Getting the bookmarklist from the dom
let bookmarksList = document.querySelector("#bookmarksList");
//getting the div holding the number of bookmarks
let bookmarkNumContainer = document.querySelector('.inline-div');
//getting the first element
let container = document.querySelector(".container");

//Class to create a new bookmark
class Boomark {
    constructor(siteName, siteUrl) {
        this.siteName = siteName;
        this.siteUrl = siteUrl;
    }
}

//Class to display in the DOM
class UI {
    //method to display bookmarks from the database
    static displayBookmarks() {
        let bookmarks = Storage.getBookmarks();
        //display each bookmark in the localStorage
        bookmarks.forEach((bookmark) => UI.addBookmarkToBookmarksList(bookmark));
        //Update the total number of bookmarks in the DOM
        UI.showTotalBookmarks();
    }

    //method to add bookmark to DOM
    static addBookmarkToBookmarksList(bookmark) {
        //creating a div of the new bookmark
        let cardBody = document.createElement("div");
        // giving the div a class
        cardBody.className = "card-body";
        //adding info of the cardbody
        cardBody.innerHTML = `
        <div class="row">
            <div class="col-sm">
                <p>${bookmark.siteName}</p>
            </div>
            <div class="col-sm">
                <p><em><mark>${bookmark.siteUrl}</mark></em></p>
            </div>
            <div class="col-sm">
                <a href="${bookmark.siteUrl}" target="_blank">
                    <button type="button" class="btn btn-light">Visit
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                            <path fill-rule="evenodd"
                                d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z">
                            </path>
                        </svg>
                    </button>
                </a>
                <button data-id = "'${bookmark.siteUrl}'" ype="button" class="btn btn-danger remove">Delete
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill-rule="evenodd"
                            d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
          `;
        //apppending a new bookmark to the bookmarklist in the DOM
        bookmarksList.appendChild(cardBody);
    }

    //method to alert different messages
    static alertMessage(message, className) {
        //creating the element to hold the message
        let div = document.createElement("div");
        //adding classes to the 
        div.className = `alert alert-${className} fade show`;
        //passing the alert message to the paragraph
        div.innerHTML = `<p>${message}</p>`;
        //getting the first child of the container
        let jumbotron = document.querySelector(".jumbotron");
        //inserting the alertmessage before the jumbotron
        container.insertBefore(div, jumbotron);
        //removeing the alert message after 3 seconds from the DOM
        setTimeout(() => document.querySelector(".alert").remove(), 2000);
    }

    // method to show the total number of bookmarks in DOM
    static showTotalBookmarks() {
        let totalBookmarks = bookmarksList.childElementCount;
        if (totalBookmarks === 0) {
            UI.pleaseAddBookmarks();
        } else {
            if (document.querySelector('.pleaseAddBookmark')) {
                document.querySelector('.pleaseAddBookmark').remove();
            }
        }
        document.querySelector("#totalBookMarks").innerHTML = totalBookmarks;
    }

    // methos to remove bookmark(s) from DOM
    static removeBookmark(url) {
        //getting all children (bookmarks) of the bookmarklist
        let bookmarks = bookmarksList.children;
        for (let i = 0; i < bookmarks.length; i++) {
            //getting the data-id (that holds the url of the bookmark) of the delete button of the current 
            let currentUrl = bookmarks[i].firstElementChild.lastElementChild.lastElementChild.getAttribute('data-id');
            //if the currentUrl is the same as the url we are passing to the method we remove all the bookmarks that have that url from the DOM
            if (currentUrl === url) {
                bookmarks[i].remove();
                i -= 1;
            }
        }
    }

    static pleaseAddBookmarks() {
        //creating a div
        let card = document.createElement('div');
        // giving the div a class
        card.className = 'card pleaseAddBookmark';
        //adding info of the card
        card.innerHTML = `
        <div class ="card-body">
            <p>Add a bookmarker  😁</p>
        </div>`;
        //apppending a new bookmark to the bookmarklist in the DOM
        container.insertBefore(card, bookmarkNumContainer);
    }
}

class Storage {
    //method to store bookmarks in the local database
    static getBookmarks() {
        //if there is no storage for bookmarks in the local database create it
        if (localStorage.getItem("bookmarks") === null) {
            localStorage.setItem("bookmarks", `[]`);
        }
        //return the storage of the bookmarks
        return JSON.parse(localStorage.getItem("bookmarks"));
    }

    //method to add a bookmark to the local database
    static addBookmark(bookmark) {
        //getting all the bookmarks
        let bookmarks = Storage.getBookmarks();
        //adding the new bookmark to the other bookmarks
        bookmarks.push(bookmark);
        //adding all the bookmarks altogether to the local database
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    //method to remove a bookmark to the local database
    static removeBookmark(bookmarkUrl) {
        //getting all the bookmarks
        let bookmarks = Storage.getBookmarks();
        //checking to see if the bookmarkUrl is equal to the url of any bookmark in the database.If it is equal we remove that bookmark
        for (let i = 0; i < bookmarks.length; i++) {
            if (`'${bookmarks[i].siteUrl}'` === bookmarkUrl) {
                bookmarks.splice(i, 1);
                i -= 1;
            }
        }
        //we add all the bookmarks except the ones that have been removed back to the database
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
}

//event to add Bookmark by submitting form
const myForm = document.querySelector("#myForm");
myForm.addEventListener("submit", (e) => {
    //preventing default
    e.preventDefault();

    // getting values from user in the form
    let siteName = document.getElementById("name").value;
    let siteUrl = document.getElementById("url").value;
    let expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    let regex = new RegExp(expression);
    //validating if the data being given to us is valid or not.If not valid we show alert messages explaining what went wrong
    if (!siteName || !siteUrl) {
        UI.alertMessage(
            "Make sure all fields are not empty before submiting",
            "warning"
        );
    } else if (!siteUrl.match(regex)) {
        UI.alertMessage("Make sure your url is valid before submiting", "warning");
        /*If valid we alert that the bookmark was added successfully and add the bookmark to both the DOM and localStorage
        We also update the total number of bookmarks in our DOM */
    } else {
        UI.alertMessage(
            "You have successfully added your bookmark 🎆🎉🎉🎈",
            "success"
        );
        let bookmark = new Boomark(siteName, siteUrl);
        myForm.reset();
        //Add the bookmark to the DOM
        UI.addBookmarkToBookmarksList(bookmark);
        //Update the total number of bookmarks in the DOM
        UI.showTotalBookmarks();
        //Add the bookmark to the local Storage
        Storage.addBookmark(bookmark);
    }
});

//event to display on loading content
window.addEventListener("DOMContentLoaded", UI.displayBookmarks);

//event listener of delete button
bookmarksList.addEventListener("click", (e) => {
    let clicked = e.target;
    //if the button clicked is a delete button
    if ([...clicked.classList].includes("remove")) {
        //we get the url of that bookmark
        let url = clicked.getAttribute("data-id");
        //any bookmark in the local storage that has the same url we remove
        Storage.removeBookmark(url);
        //any bookmark in the DOM that has the same url we remove
        UI.removeBookmark(url);
        //Update the total number of bookmarks in the DOM
        UI.showTotalBookmarks();
    }
});