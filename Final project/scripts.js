import { BOOKS_PER_PAGE, authors, genres, books } from "./data";

if (!books || !Array.isArray(books)) {
  throw new Error("Source required");
}
// Declare and initialize an array variable 'matches' with a value of 'books'
let matches = [...books];

// bookview
const dataListItems = document.querySelector("[data-list-items]");
const dataListButton = document.querySelector("[data-list-button]");
const dataListMessage = document.querySelector("[data-list-message]");

// pop-up
const dataListActive = document.querySelector("[data-list-active]");
const dataListBlur = document.querySelector("[data-list-blur]");
const dataListImage = document.querySelector("[data-list-image]");
const dataListTitle = document.querySelector("[data-list-title]");
const dataListSubtitle = document.querySelector("[data-list-subtitle]");
const dataListDescription = document.querySelector("[data-list-description]");
const dataListCloseBtn = document.querySelector("[data-list-close]");

// Theme Day/Night
const settingsTheme = document.querySelector("[data-settings-theme]");
const headerSettingsBtn = document.querySelector("[data-header-settings]");
const settingsCancelBtn = document.querySelector("[data-settings-cancel]");
const settingsForm = document.querySelector("[data-settings-form]");

// Declare and initialize a boolean variable 'isOpen' with a value of 'false'
let isOpen = false;

// Declare and initialize a number variable 'page' with a value of '1'
let page = 1;

// Declare two constant objects 'day' and 'night' with keys representing the color modes 'dark' and 'light', and values that are RGB values as strings.
const day = {
  dark: "10, 10, 20",
  light: "255, 255, 255",
};
const night = {
  dark: "255, 255, 255",
  light: "10, 10, 20",
};

//Event listners
const toggleSettings =
  // Toggle the settings overlay when the settings button is clicked
  (toggleSettings = (event) => {
    // Toggle the value of 'isOpen' between true and false(boolean)
    isOpen = !isOpen;

    // Get the backdrop and settings overlay elements
    const backdrop = document.querySelector(".backdrop");
    const settingsOverlay = document.querySelector("[data-settings-overlay]");

    // If the overlay is open, display the backdrop and settings overlay; otherwise, hide them
    if (isOpen) {
      backdrop.style.display = "block";
      settingsOverlay.style.display = "block";
    } else {
      backdrop.style.display = "none";
      settingsOverlay.style.display = "";
    }
  });

const handleSettingsFormSubmit = (event) => {
  event.preventDefault();
  const selectedTheme = settingsTheme.value;

  // Set the CSS variables for light and dark mode based on the selected theme
  const { dark, light } = selectedTheme === "day" ? day : night;
  document.documentElement.style.setProperty("--color-dark", dark);
  document.documentElement.style.setProperty("--color-light", light);

  // Hide the backdrop and show the settings overlay
  const backdrop = document.querySelector(".backdrop");
  backdrop.style.display = "none";
  document.querySelector("[data-settings-overlay]").style.display = "";
};

/* 
   Define a function called dataListShowHandler.
 * Check if there are any matches in the 'matches' array, if matches  -> enable 'dataListButton'.
 * Hide the 'dataListMessage' ("list__message_show")
 * Clear the 'dataListItems' container
 *  Append a new set of previews to the 'dataListItems' container eg. BOOKS_PER_PAGE.
*/
const dataListShowHandler = () => {
  if (matches.length > 0) {
    dataListButton.disabled = false;
    dataListMessage.classList.remove("list__message_show");
    dataListItems.innerHTML = "";
    dataListItems.appendChild(
      createPreviewsFragment(
        matches,
        page * BOOKS_PER_PAGE, //page counter  (page +1)
        (page + 1) * BOOKS_PER_PAGE,
        lastPreviewId));
  
    // Update the text of the 'dataListButton'
    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - BOOKS_PER_PAGE * page
        })</span>
    `;
  } else {
    // If there are no matches, clear the 'dataListItems' container and show the 'dataListMessage'
    dataListItems.innerHTML = "";
    dataListMessage.classList.add("list__message_show");
    // Disable the 'data_list_button'
    dataListButton.disabled = true;
  }
};


const dataListItemsHandler = (event) => {
  // Gets the path of elements that triggered the event and turns it into an array
  const pathArray = Array.from(event.path || event.composedPath());

  let bookId;
  let bookObj;
  // Loops through the pathArray and sets the bookId variable to the dataset.id of the first element that has it
  for (let i = 0; i < pathArray.length; i++) {
    if (pathArray[i].dataset.id) {
      bookId = pathArray[i].dataset.id;
      break;
    }
  }
  // Loops through the matches array and sets the bookObj variable to the book object that matches the bookId
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].id === bookId) {
      bookObj = matches[i];
      break;
    }
  }

  // Sets the open property of the dataListActive object to true
  dataListActive.open = true;

  // Sets the src property of the dataListBlur and dataListImage elements to the bookObj image
  dataListBlur.src = bookObj.image;
  dataListImage.src = bookObj.image;

  // Sets the innerText property of the dataListTitle and dataListSubtitle elements to the bookObj title and author name respectively
  dataListTitle.innerText = bookObj.title;
  dataListSubtitle.innerText = `${authors[bookObj.author]} (${new Date(
    bookObj.published
  ).getFullYear()})`;

  // Sets the innerText property of the dataListDescription element to the bookObj's description
  dataListDescription.innerText = bookObj.description;
};

// Define a function to handle search events
const dataSearchHandler = (event) => {
  // Toggle the value of isOpen
  isOpen = !isOpen;

  // If isOpen is true, show the search overlay and backdrop
  if (isOpen) {
    document.querySelector(".backdrop").style.display = "block";
    document.querySelector("[data-search-overlay]").style.display = "block";
  }
  // If isOpen is false, hide the search overlay and backdrop
  else {
    document.querySelector(".backdrop").style.display = "none";
    document.querySelector("[data-search-overlay]").style.display = "";
  }
};

//event listener
const dataSearchSubmitHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  // Find author and genre id's based on the user's search input
  const tempAuthorId = Object.keys(authors).find(
    (key) => authors[key] === filters.author
  );
  const tempGenreId = Object.keys(genres).find(
    (key) => genres[key] === filters.genre
  );

  // Filter matches array based on user's search criteria
  if (filters.title != "") {
    matches = matches.filter((book) =>
      book.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }
  if (filters.genre != "any") {
    matches = matches.filter((book) => book.genres.includes(tempGenreId));
  }
  if (filters.author != "any") {
    matches = matches.filter((book) => book.author == tempAuthorId);
  }
  // Update book list with filtered matches
  dataListItems.innerHTML = "";
  dataListItems.appendChild(createPreviewsFragment(matches, BOOKS_PER_PAGE, 1));

  // Hide "No books found" message and enable Load More button
  dataListMessage.classList.remove("list__message_show");
  dataListButton.disabled = false;
};


// A function that creates a preview element for a book object
const createPreview = (bookObj) => {
  // Extract properties from the book object
  const { author, image, title, id } = bookObj;

  // Create a new div element for the preview
  const previewElement = document.createElement("div");
  previewElement.className = "preview";
  previewElement.dataset.id = id;

  // Set the HTML content of the preview element using a template literal
  previewElement.innerHTML = /* Html*/ `
    <div>
        <img class="preview__image" src="${image}" alt="book image">
    </div>
    <div class="preview__info">
        <div class="preview__title">${title}</div>
        <div class="preview__author">${authors[author]}</div>
    </div>
`;

  // Return the preview element
  return previewElement;
};


const createPreviewsFragment = (booksArray, booksPerPage, page) => {
  // Extract a subset of the books array based on the number of books per page and the current page number
  const extracted = booksArray.slice(0, booksPerPage * page);

  // Use `map` method to create a preview element for each book and store the elements in an array
  const previewElements = extracted.map(({ author, id, image, title }) =>
    createPreview({ author, id, image, title })
  );

  // Create a new document fragment and append all preview elements to it
  const fragment = document.createDocumentFragment();
  previewElements.forEach((preview) => fragment.appendChild(preview));

  // Return the completed document fragment
  return fragment;
};


// Add the document fragment returned by the createPreviewsFragment function to the dataListItems element on the page
dataListItems.appendChild(
  createPreviewsFragment(matches, BOOKS_PER_PAGE, page)
);

/* Define a function called 'populateDropDown' that takes in three parameters:
* a drop-down element, a string representing the type of drop-down, and an object of data
*/
const populateDropDown = (dropDownElement, dropDownType, dataObject) => {
  // document fragment to hold the drop-downs
  const fragment = document.createDocumentFragment();

  // Create an initial option element with a value of 'any' and inner text of 'All [dropDownType]'
  const fragmentElement = document.createElement("option");
  fragmentElement.dataset.id = "";
  fragmentElement.value = "any";
  fragmentElement.innerText = `All ${dropDownType}`;

  // Append the initial option element to the document fragment
  fragment.appendChild(fragmentElement);

  // Loop through each entry
  for (const [id, name] of Object.entries(dataObject)) {
    // Create an option element for the current data object entry
    const element = document.createElement("option");
    element.dataset.id = id;
    element.value = name;
    element.innerText = name;

    fragment.appendChild(element);// Append the option element to the document fragment
  }

  dropDownElement.appendChild(fragment);// Append the document fragment containing all the drop-down options to the drop-down element
};


/*Call the 'populateDropDown' function twice, passing in a different argument for each call, 
* including the respective authors and genres data objects.
*/
populateDropDown(data_search_authors, "Authors", authors);
populateDropDown(data_search_genres, "Genres", genres);

// Disable "Show more" button if no more books to show
dataListButton.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0);

/* 
* Set the text for "Show more" button with the remaining number of books using 
* template literals.
*/
dataListButton.innerHTML = /* html */ `
<span>Show more</span>
<span class="list__remaining"> (${
  matches.length - [page * BOOKS_PER_PAGE] > 0
    ? matches.length - [page * BOOKS_PER_PAGE]
    : 0
})</span>

`;





