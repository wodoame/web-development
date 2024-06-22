**Data attributes** in HTML allow you to associate custom data with an element without affecting its visual representation. They're particularly useful when working with JavaScript. Here's what you need to know:

1. **Syntax:**
   - Any attribute that starts with `data-` is a data attribute.
   - Example:
     ```html
     <article id="electric-cars" data-columns="3" data-index-number="12314" data-parent="cars">
         <!-- ... -->
     </article>
     ```

2. **JavaScript Access:**
   - Use the `dataset` property to read data attributes in JavaScript.
   - Example:
     ```javascript
     const article = document.querySelector("#electric-cars");
     const columns = article.dataset.columns; // "3"
     const indexNumber = article.dataset.indexNumber; // "12314"
     const parent = article.dataset.parent; // "cars"
     ```

3. **CSS Access:**
   - You can even access data attributes from CSS.
   - Example (showing parent data in generated content):
     ```css
     article::before {
         content: attr(data-parent);
     }
     ```

Remember, data attributes are handy for storing custom data associated with elements, and you can use them both in JavaScript and CSS!
[Learn more about data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
