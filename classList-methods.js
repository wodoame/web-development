//In JavaScript, the `classList` property of an HTML element represents the class attribute as a live collection of DOMToken objects.
//It provides several methods for manipulating the classes of an element. 
//Here are some of the key methods:

//1. **`add(class1, class2, ...)`**:
   //- Adds one or more class names to the element.

   element.classList.add("newClass");
  

//2. **`remove(class1, class2, ...)`**:
   //- Removes one or more class names from the element.
   
   element.classList.remove("oldClass");

//3. **`toggle(className, force)`**:
   //- Toggles the existence of a class; adds the class if it doesn't exist, and removes it if it does.
   //- You can also use the optional `force` parameter to explicitly add or remove the class based on a boolean value.
   
   element.classList.toggle("active");
   

//4. **`contains(className)`**:
   //- Returns a boolean indicating whether the element has the specified class.

   const hasClass = element.classList.contains("checkClass");
   

//5. **`replace(oldClass, newClass)`**:
   //- Replaces an existing class with a new class.

   element.classList.replace("oldClass", "newClass");
   

//These methods make it easy to dynamically manipulate the classes of an HTML element in response to user actions or other events.
