To remove an element from the Document Object Model (DOM) in JavaScript, you can use the `removeChild()` method or the `remove()` method, depending on your preference and browser support.

Here's how to use both methods:

**Method 1: Using `removeChild()`**

```javascript
// Get a reference to the element you want to remove
var elementToRemove = document.getElementById("elementId"); // Replace "elementId" with the actual ID of the element you want to remove

// Check if the element exists
if (elementToRemove) {
  // Get the parent of the element
  var parentElement = elementToRemove.parentNode;

  // Remove the element from its parent
  parentElement.removeChild(elementToRemove);
}
```

In this example, you first select the element you want to remove and then get a reference to its parent. Finally, you call `removeChild()` on the parent element to remove the child element.

**Method 2: Using `remove()` (Modern browsers)**

The `remove()` method is a more straightforward way to remove an element and is supported in modern browsers.

```javascript
// Get a reference to the element you want to remove
var elementToRemove = document.getElementById("elementId"); // Replace "elementId" with the actual ID of the element you want to remove

// Check if the element exists
if (elementToRemove) {
  // Use the remove() method to remove the element
  elementToRemove.remove();
}
```

This method directly calls the `remove()` method on the element you want to remove.

Make sure to replace `"elementId"` with the actual ID or reference to the element you wish to remove. Additionally, always ensure that the element exists in the DOM before attempting to remove it to avoid errors.
