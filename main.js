// Client ID

const accessKey = 'YrJyABQVUPyquPqzUlRHWfVez2uLWmUiG0zUOtHSEcY';

// The form

const searchForm = document.getElementById("search-form");

// The input of the text that the user want to search an image

const searchBox = document.getElementById("search-box");

// The images that will appear as soon as it receive the request

const searchResult = document.getElementById("search-result");

// The button that handle with the request of the user to see more images

const showMoreBtn = document.getElementById("show-more-btn");

// This is the key to join with the API and receive some results

let keyword = "";

// This is the page's quantity to be accessed

let page = 1;

// So, we have to make a function that request by a URL the results (images) we want to see

// Fisrt of all, we create this funtion in an async way

async function searchImages(){

    // The value that the user want to receive the images

    keyword = searchBox.value;

    // The URL of access

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Handling with the response

    const response = await fetch(url);

    // Handling with the data

    const data = await response.json();

    // Checking the page

    if (page===1){
        searchResult.innerHTML = "";
    }

    // Receiving the results in object data

    const results = data.results;

    // Mapping the results

    results.map((result)=>{

        // Creating the tag img
        const image = document.createElement('img');

        // Putting the src in this img
        image.src = result.urls.small;

        // Creating the tag a
        const imageLink = document.createElement('a');

         // Putting the href in this img
         imageLink.href = result.links.html;
         // Putting the a with target _blank
         imageLink.target = "_blank";

         // Connecting the A with the IMG
         imageLink.appendChild(image);

        // Connecting the DIV with the A
        searchResult.appendChild(imageLink);
    });

    // Show the button "Show more"
    showMoreBtn.style.display = 'block';

}

// Listening the call of the user

searchForm.addEventListener("submit", (e) =>{

    // Preventing it from submitting a form
    e.preventDefault();

    page = 1;

    // Calling the function already made
    searchImages();
});

// Listening the call of the user in the btn "Show more"

showMoreBtn.addEventListener("click", ()=>{

    // Increasing the value of the page
    page++;

    // Calling the function already made
    searchImages();
});
