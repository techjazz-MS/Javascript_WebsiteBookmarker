// Listen for Form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
// Get form values
var siteName = document.getElementById('siteName').value;   
var siteUrl = document.getElementById('siteUrl').value;

if(!validateForm(siteName, siteUrl)){
    return false;
}

// Object that holds the form values to be stored in local storage
var bookmark = {
    name: siteName,
    url: siteUrl
}

// console.log(bookmark);

// Local Storage Test
//localStorage.setItem('test', 'Hello World'); //Save an item in local storage
//console.log(localStorage.getItem('test')); //Fetch an item from LocalStorage
//localStorage.removeItem('test'); //Delete an item from LocalStorage
//console.log(localStorage.getItem('test'));

// Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Save to localStorage. JSON.stringify() would turn a JSON into string
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else{
    // Get bookmarks from localStorage. JSON.parse() would turn a String into JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    //Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//Clear form
document.getElementById('myForm').reset();


//Re-fetch bookmarks
fetchBookmarks();

//  Prevent form from submitting
    // console.log("It works");
    e.preventDefault();
}

//Delete Bookmarks
function deleteBookmark(url){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++)
    {
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);

        }
    }
    //Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage. JSON.parse() would turn a String into JSON
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card card-body bg-light">' +
                                       '<h4>' + name + 
                                       '    <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a>' + 
                                       '    <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                       '</h4>' +
                                       '</div>' + '<br>';
    }
}

//Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
        
    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}