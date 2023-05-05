import { BOOKS_PER_PAGE, authors, genres, books } from "./data";

if (!books || !Array.isArray(books)) {throw new Error('Source required');
}

// Define the selectors for the search input
const selectors = {
  searchBtn: '[data-header-search]',
  cancelBtn: '[data-search-cancel]',
  genres: '[data-search-genres]',
  authors: '[data-search-authors]',
  form: '[data-search-form]',
};

// Assign the DOM elements with the selectors to variables
const {
  searchBtn: data_header_searchBtn,
  cancelBtn: data_search_cancelBtn,
  genres: data_search_genres,
  authors: data_search_authors,
  form: data_search_form,
} = selectors;

// Assign the DOM elements with the attributes to variables for the book list view and popup summary
const {
  dataListItems: data_list_items,
  dataListButton: data_list_button,
  dataListMessage: data_list_message,
  dataListActive: data_list_active,
  dataListBlur: data_list_blur,
  dataListImage: data_list_image,
  dataListTitle: data_list_title,
  dataListSubtitle: data_list_subtitle,
  dataListDescription: data_list_description,
  dataListCloseBtn: data_list_closeBtn,
} = {
  dataListItems: document.querySelector('[data-list-items]'),
  dataListButton: document.querySelector('[data-list-button]'),
  dataListMessage: document.querySelector('[data-list-message]'),
  dataListActive: document.querySelector('[data-list-active]'),
  dataListBlur: document.querySelector('[data-list-blur]'),
  dataListImage: document.querySelector('[data-list-image]'),
  dataListTitle: document.querySelector('[data-list-title]'),
  dataListSubtitle: document.querySelector('[data-list-subtitle]'),
  dataListDescription: document.querySelector('[data-list-description]'),
  dataListCloseBtn: document.querySelector('[data-list-close]'),
};

// Theme Day/Night
const settingsTheme = document.querySelector('[data-settings-theme]');
const headerSettingsBtn = document.querySelector('[data-header-settings]');
const settingsCancelBtn = document.querySelector('[data-settings-cancel]');
const settingsForm = document.querySelector('[data-settings-form]');


// Declare and initialize a boolean variable 'isOpen' with a value of 'false'
let isOpen = false;

// Declare and initialize an array variable 'matches' with a value of 'books'
let matches = [...books];

// Declare and initialize a number variable 'page' with a value of '1'
let page = 1;

// Declare two constant objects 'day' and 'night' with keys representing the color modes 'dark' and 'light', and values that are RGB values as strings.
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

// Event listners
// Toggle the settings overlay when the settings button is clicked
const toggleSettings = (event) => {
    // Toggle the value of 'isOpen' between true and false
    isOpen = !isOpen;

    // Get the backdrop and settings overlay elements
    const backdrop = document.querySelector('.backdrop');
    const settingsOverlay = document.querySelector('[data-settings-overlay]');

    // If the overlay is open, display the backdrop and settings overlay; otherwise, hide them
    if (isOpen) {
        backdrop.style.display = 'block';
        settingsOverlay.style.display = 'block';
    } else {
        backdrop.style.display = 'none';
        settingsOverlay.style.display = '';
    }
}


const handleSettingsFormSubmit = (event) => {
  event.preventDefault();

  // Get the selected theme from the settings form
  const selectedTheme = data_settings_theme.value;

  // Set the CSS variables for light and dark mode based on the selected theme
  let dark, light;
  if (selectedTheme === 'day') {
      dark = day.dark;
      light = day.light;
  } else {
      dark = night.dark;
      light = night.light;
  }
  document.documentElement.style.setProperty('--color-dark', dark);
  document.documentElement.style.setProperty('--color-light', light);

  // Hide the backdrop and show the settings overlay
  const backdrop = document.querySelector('.backdrop');
  backdrop.style.display = 'none';
  document.querySelector('[data-settings-overlay]').style.display = '';
}

const data_list_showHandler = () => {
  // Check if there are any matches in the 'matches' array
  if (matches.length > 0) {
      // If there are matches, enable the 'data_list_button'
      data_list_button.disabled = false;
      // Hide the 'data_list_message'
      data_list_message.classList.remove('list__message_show');
      // Clear the 'data_list_items' container
      data_list_items.innerHTML = '';
      // Append a new set of previews to the 'data_list_items' container
      const previewsFragment = createPreviewsFragment(matches, BOOKS_PER_PAGE, page + 1);
      data_list_items.appendChild(previewsFragment);
      // Increment the 'page' counter
      page += 1;
      // Update the text of the 'data_list_button'
      const remaining = matches.length - (BOOKS_PER_PAGE * page);
      const remainingText = remaining > 0 ? `(${remaining})` : '';
      data_list_button.innerHTML = `<span>Show more</span><span class="list__remaining">${remainingText}</span>`;
  } else {
      // If there are no matches, clear the 'data_list_items' container and show the 'data_list_message'
      data_list_items.innerHTML = '';
      data_list_message.classList.add('list__message_show');
      // Disable the 'data_list_button'
      data_list_button.disabled = true;
  }
};

/*
 * defines a function that handles a click event on a data search form.
 * It prevents the default form behavior, extracts form data, and converts it to an object.
 * It loops over a list of books, checking whether each book meets filter criteria for title, author, and genre.
 * If a book meets all criteria, it is added to a result array.
 * Once all books have been checked, the function returns the result array.
 */

 dataSearchForm.click(filters) {

  Event.preventDefault(); //prevents default event of the element from taking place
  const formData = new FormData(Event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (let i = 0; i < booksList.length; i++) {
    let books = booksList[i];
    const titleMatch =
      filters.title.trim() === "" ||
      books.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorsMatch =
      filters.authors === "any" || book.authors === filters.author;
    let genreMatch = filters.genre === "any";
    if (!genreMatch) {
      for (let j = 0; j < book.genres.length; j++) {
        if (book.genres[j] === filters.genre) {
          genreMatch = true;
          break;
        }
      }
    }
    if (titleMatch && authorsMatch && genreMatch) {
      result.push(book);
    }
  }
  return result;
}