You can replace the URL in the address bar using JavaScript without navigating to the new URL. This can be done using the History API, specifically the `history.pushState()` and `history.replaceState()` methods. Here's a quick example:

```javascript
// This will create a new entry in the browser's history
window.history.pushState({additionalInformation: 'Updated the URL with JS'}, 'New Page Title', '/new-url');

// This will replace the current entry in the browser's history
window.history.replaceState({additionalInformation: 'Updated the URL with JS'}, 'New Page Title', '/new-url');
```

- **`pushState()`**: Adds a new entry to the browser's history.
- **`replaceState()`**: Replaces the current entry in the browser's history.

Here's a breakdown of the parameters for both `pushState()` and `replaceState()`:

### `history.pushState(state, title, url)`

1. **`state`**: An object containing state information to be associated with the new history entry. This can be any JavaScript object and is useful for storing data you might need if the user navigates back to this state.
2. **`title`**: A string representing the title of the new history entry. Currently, most browsers ignore this parameter, so you can pass an empty string (`''`).
3. **`url`**: A string representing the new URL. The URL must be of the same origin as the current URL. If this parameter is omitted, the current URL is used.

### `history.replaceState(state, title, url)`

1. **`state`**: Similar to `pushState()`, this is an object containing state information to be associated with the current history entry.
2. **`title`**: A string representing the title of the current history entry. Like with `pushState()`, most browsers ignore this parameter.
3. **`url`**: A string representing the new URL for the current history entry. This must be of the same origin as the current URL.

Here's an example of how you might use these methods:

```javascript
// Using pushState to add a new history entry
window.history.pushState({page: 1}, 'Page 1', '/page1');

// Using replaceState to modify the current history entry
window.history.replaceState({page: 2}, 'Page 2', '/page2');
```
You can access the state object associated with a history entry using the `history.state` property. This property returns the state object of the current history entry. Here's an example:

```javascript
// Adding a new history entry with a state object
window.history.pushState({page: 1, name: 'Home'}, 'Home Page', '/home');

// Accessing the state object
let currentState = window.history.state;
console.log(currentState); // Output: {page: 1, name: 'Home'}
```

Whenever you navigate to a different state using the browser's back or forward buttons, the `popstate` event is triggered, and you can access the state object within the event handler:

```javascript
window.addEventListener('popstate', function(event) {
    console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
});
```

This way, you can handle changes in the state and update your page accordingly.
