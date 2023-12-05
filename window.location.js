// In JavaScript, you can check the current URL of the page using the `window.location` object. Here are a few ways to access information about the current URL:
// 1. **`window.location.href`**: Returns the entire URL.

    var currentURL = window.location.href;
    console.log(currentURL);

// 2. **`window.location.protocol`**: Returns the protocol of the URL (e.g., "http:", "https:").

    var protocol = window.location.protocol;
    console.log(protocol);
    

// 3. **`window.location.host`**: Returns the hostname and port of the URL.

    var host = window.location.host;
    console.log(host);

// 4. **`window.location.hostname`**: Returns the hostname of the URL.

    var hostname = window.location.hostname;
    console.log(hostname);
  

// 5. **`window.location.pathname`**: Returns the path and filename of the URL.

    var path = window.location.pathname;
    console.log(path);

// 6. **`window.location.search`**: Returns the query string portion of the URL.

    var queryString = window.location.search;
    console.log(queryString);
    
// 7. **`window.location.hash`**: Returns the fragment identifier (hash) portion of the URL.

    var hash = window.location.hash;
    console.log(hash);

// Choose the appropriate property based on the specific information you need. For example, if you want the entire URL, use `window.location.href`.
// If you only need the path, use `window.location.pathname`, and so on.

// Remember that this information is read-only, and you cannot modify the `window.location` object to navigate to a different URL directly.
// If you need to navigate to a different URL, you can use `window.location.href` to set the new URL:

// Redirect to a new URL
window.location.href = 'https://example.com/new-page';
