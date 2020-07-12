// declaring variables
let myForm = document.getElementById('myForm');
let siteName = document.getElementById('name');
let siteUrl = document.getElementById('url');
let bookmarksList = document.getElementById('bookmarksList');
let messages = document.querySelector('.messages');
let totalBookMarks = document.getElementById('totalBookMarks');

let bookmarkArray = [];

//getting bookmark from user
function getBookmark() {
    let bookmark = {
        siteName: siteName.value,
        siteUrl: siteUrl.value
    }
    if (!validatedData(bookmark.siteName, bookmark.siteUrl)) {
        showTextWarning();
        return;
    }
    showTextConfirmation();
    return bookmark;
}

//validation of data
function validatedData(name, url) {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!name || !url || !url.match(regex)) {
        return false;
    }
    return true;
}

//show cconfirmation of adding text
function showTextConfirmation() {
    let div = document.createElement('div');
    div.classList.add('alert', 'alert-success', 'add-text', 'fade', 'show');
    div.innerHTML = `<p>Your bookmark has been added successfully 🎆🎉🎉🎈</p>`;
    messages.appendChild(div);
    setTimeout(() => {
        $('.add-text').alert('close')
    }, 2000);
}

//show warning of adding bookmark
function showTextWarning() {
    let div = document.createElement('div');
    div.classList.add('alert', 'alert-warning', 'add-text', 'fade', 'show');
    div.innerHTML = `<p>Please add some text in both fields or a valid url</p>`;
    messages.appendChild(div);
    setTimeout(() => {
        $('.add-text').alert('close')
    }, 2000);
}

//show info of deleteing bookmark
function showTextDelete() {
    let div = document.createElement('div');
    div.classList.add('alert', 'alert-info', 'add-text', 'fade', 'show');
    div.innerHTML = `<p>You have successfully deleted your bookmark</p>`;
    messages.appendChild(div);
    setTimeout(() => {
        $('.add-text').alert('close')
    }, 2000);
}

//show total amount of bookmarks
function totalBookmarks() {
    totalBookMarks.innerHTML = bookmarkArray.length;
}

//adding bookmark to array
function addBookmark(e) {
    let bookmark = getBookmark();
    if (!bookmark) {
        myForm.reset();
        e.preventDefault();
        return;
    }
    myForm.reset();
    bookmarkArray.push(bookmark);
    //refresh page after adding
    storeData();
    totalBookmarks();
    displayBookmarks();
    e.preventDefault();
    return;
}

//delete bookmark from array
function deleteBookmark(siteUrl) {
    for (let i = 0; i < bookmarkArray.length; i++) {
        if (bookmarkArray[i].siteUrl == siteUrl) {
            bookmarkArray.splice(i, 1);
            i = i - 1;
        }
    }

    //show that the bookmark has been delted successfully
    showTextDelete();
    //refresh page after delete
    storeData();
    totalBookmarks();
    displayBookmarks();
}

function displayBookmarks() {
    let result = '';
    totalBookmarks();
    let bookmarks = getStorage();
    if (!bookmarks || bookmarks.length === 0) {
        result +=
            `
            <div class="card">
                <div class="card-body">
                    <p class="lead">Add some bookmarks 😁</p>
                </div>
            </div>
            `
        bookmarksList.innerHTML = result;
        return;
    }
    bookmarks.forEach(bookmark => {
        result +=
            `
        <div class="card-body">
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
                <button type="button" class="btn btn-danger" onclick="deleteBookmark('${bookmark.siteUrl}')">Delete
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill-rule="evenodd"
                            d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
        </div>
        `
    });
    bookmarksList.innerHTML = result;
}

//storage
function storeData() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
}

function getStorage() {
    bookmarkArray = (JSON.parse(localStorage.getItem('bookmarks')) || []);
    return bookmarkArray;
}

// event listeners
myForm.addEventListener('submit', addBookmark);
window.onload = displayBookmarks();