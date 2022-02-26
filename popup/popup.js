// TODO: put these somewhere
const mdnBaseURL = 'https://developer.mozilla.org';
const searchIndexUrl = 'https://developer.mozilla.org/en-US/search-index.json';

// Taken from the examples page from the twitter typeahead library
// https://twitter.github.io/typeahead.js/examples/#the-basics
var substringMatcher = function(mdnPages) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(mdnPages, function(i, mdnPage) {
        if (substrRegex.test(mdnPage.title)) {
          matches.push(mdnPage);
        }
      });
  
      cb(matches);
    };
  };

$(document).ready(() => {
    $('.typeahead-container .typeahead-search').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        display: 'title',
        source: substringMatcher(data),
        templates: {
            empty: [
            '<div class="empty-message">',
                'unable to find any results that match the current query.',
            '</div>'
            ].join('\n'),
            suggestion: function(data) {
                return '<div><strong><a href="' + mdnBaseURL + data.url + '#syntax' + '">' + data.title + '<a/></strong><p style="font-size: 14px;">' + data.url.split('/').join(' / ') + '</p></div>';
              }
        }
    });

    // Close the popup when the user has selected an item
    $('.typeahead-container .typeahead-search').on('typeahead:select', (_event, suggestion) => {
        browser.tabs.create({ url: mdnBaseURL + suggestion.url});
        window.close();
    });

    // Expand the popup when a user goes to type
    $('.typeahead-container .typeahead-search').on('typeahead:active', () => $('body').height('400px'));

    $('.typeahead-container .typeahead-search').on('typeahead:close', (_event, suggestion) => {
        $('body').height('200px');
    })

    // Clear typeahead search box
    $('.typeahead-container button').on('click', () => $('.typeahead-container .typeahead-search').typeahead('val', ''))
})
