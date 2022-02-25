console.error('here')

const searchIndexUrl = 'https://developer.mozilla.org/en-US/search-index.json'
const searchInput = $('#search');
const title = document.getElementById('title');

// Nice, you've just reinvented a SPA
searchInput.on('change', event => {
    console.log(data)
    title.textContent = event.target.value;
});
