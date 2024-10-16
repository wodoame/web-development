You can achieve a fade-in effect for a dropdown menu using a combination of HTML, CSS, and JavaScript. Here's a simple example to get you started:

### HTML
```html
<button id="dropdownButton">Click me</button>
<div id="dropdownMenu" class="dropdown-content">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</div>
```

### CSS
```css
/* Initial state of the dropdown menu */
.dropdown-content {
  display: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Show the dropdown menu */
.dropdown-content.show {
  display: block;
  opacity: 1;
}
```

### JavaScript
```javascript
document.getElementById("dropdownButton").addEventListener("click", function() {
  var dropdown = document.getElementById("dropdownMenu");
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  } else {
    dropdown.classList.add("show");
  }
});
```

### Explanation
1. **HTML**: The button and the dropdown menu are defined. The dropdown menu is initially hidden.
2. **CSS**: The `.dropdown-content` class sets the initial state of the dropdown (hidden and transparent). The `.show` class makes it visible and fully opaque, with a transition effect.
3. **JavaScript**: The event listener toggles the `.show` class on the dropdown menu when the button is clicked, triggering the fade-in effect.

Exactly! The `display` property can't be animated directly, but by animating the `opacity` property and toggling the `display` property, you can create a smooth fade-in effect. This approach ensures that the dropdown smoothly transitions from invisible to visible, rather than just appearing abruptly.
