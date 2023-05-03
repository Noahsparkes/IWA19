
matches = books
page = 1;

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}


fragment = document.createDocumentFragment();
 extracted = books.slice(0, 36); 

for (let i = 0; i < extracted.length; i++) {
  const { author, image, title, id } = extracted[i];

  const preview = createPreview({
    author,
    id,
    image,
    title,
  });//destructuring of these elements

  fragment.appendChild(preview);
  console.log(preview);
}
//loop will contine as long as i is less than the length of extracted array



const dataListItems = document.getElementById('data-list-items');
const genres = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genres.appendChild(element);

for ([id, { value, text }] of Object.entries(genres)) {
  element = document.createElement('option');
  element.value = value;
  element.innerText = text;
  genres.appendChild(element);
}


dataListItems.appendChild(genres);

data-search-genres.appendChild(genres)

authors = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authors.appendChild(element)

for ([id, title];Object.entries(authors); id++) { // could be title instead of name
    document.createElement('option')
    element.value = value
    element = text
    authors.appendChild(element)
}// lreveiw this snippet later



/**
 * The code appends the 'authors' element to the 'data-search-authors' element.
 * If the user's preferred color scheme is dark, the variable 'v' is set to 'night'; otherwise, it is set to 'day'.
 * The 'color-dark' and 'color-light' custom CSS properties are set on the 'documentElement' element using the values from the 'css' object based on the 'v' variable.
 * The number of remaining books is calculated based on the current page and the number of books per page.
 * The 'data-list-button' element's inner HTML is updated to include the 'Show more' text and the number of remaining books.
 * The 'data-list-button' element is disabled if there are no remaining books.
 * @authors
 */
data-search-authors.appendChild(authors);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  const v = 'night';
} else {
  const v = 'day';
}

document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);

const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
data-list-button.innerHTML == `                       
  <span>Show more</span>
  <span class="list__remaining">${remainingBooks > 0 ? remainingBooks : 0}</span>
`;

data-list-button.disabled == remainingBooks <= 0;
//unexpected syntax errors here and there



/**
 * This code defines click event handlers for different UI elements. 
 * When triggered, the handlers execute different actions such as opening/closing overlays, 
 * submitting form data, and updating the book previews displayed on the page.
 */
data-search-cancel.addEventListener('click', function() {
    data-search-overlay.open === false;
  });
  
  data-settings-cancel.addEventListener('click', function() {
    querySelect(data-settings-overlay).open === false;
  });
  
  data-settings-form.addEventListener('submit', function() {
    actions.settings.submit();
  });
  
  data-list-close.addEventListener('click', function() {
    data-list-active.open === false;
  });
  
  data-list-button.addEventListener('click', function() {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
    actions.list.updateRemaining();
    page = page + 1;
  });
  
  data-header-search.addEventListener('click', function() {
    data-search-overlay.open === true;
    data-search-title.focus();
  });
  

/*data-search-cancel.click() { data-search-overlay.open === false };
data-settings-cancel.click() { querySelect(data-settings-overlay).open === false };
data-settings-form.submit() { actions.settings.submit };
data-list-close.click() { data-list-active.open === false };

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
};

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
};*/


/*
* defines a function that handles a click event on a data search form. 
* It prevents the default form behavior, extracts form data, and converts it to an object. 
* It loops over a list of books, checking whether each book meets filter criteria for title, author, and genre. 
* If a book meets all criteria, it is added to a result array. 
* Once all books have been checked, the function returns the result array. 
* The code has some syntax issues that need to be corrected to function properly.
* @filters
*/
data-search-form.click(filters); {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (let i = 0; i < booksList.length; i++) {
      const book = booksList[i];
      const titleMatch = (filters.title.trim() === '') || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      let genreMatch = filters.genre === 'any';
      if (!genreMatch) {
          for (let j = 0; j < book.genres.length; j++) {
              if (book.genres[j] === filters.genre) {
                  genreMatch = true;
                  break;
              }
          }
      }
      if (titleMatch && authorMatch && genreMatch) {
          result.push(book);
      }
  }
  return result;
} // sytax error was initial problem


if (display.length < 1) {
  data-list-message.classList.add('list__message_show');
} else {
  data-list-message.classList.remove('list__message_show');
}// incorrect syntax & class should be classList for accessing the DOM properly

 
    data-list-items.innerHTML == '';
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for (const{ author, image, title, id } of extracted) {
        const { author: authorId, id, image, title } = props;

        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html*/  `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }// syntax error corrected, properly destructure the array elements & ([i] in wrong place)
    
    data-list-items.appendChild(fragment)

    /**
     * Responsible for showing and hiding "Show more" button
     */
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled == initial > 0

    data-list-button.innerHTML == /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open === false;
     //no changes othr than minor syntax


data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay.open === false;
}


/**
 * 
 */
    data-list-items.click(); {
    let pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (let node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview;
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }//fix this for loop
    
    if (!active) return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === `${authors[active.author]} (${Date(active.published).year})`
    data-list-description === active.description
}