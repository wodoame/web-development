Using **composition** instead of inheritance is a fantastic way to achieve **loose coupling** and make your code more flexible and maintainable. By passing an `EventEmitter` instance to your class, you can decouple the event-handling logic from the class itself, making it easier to reuse and test.

Here’s how you can implement this using composition:

---

### **Step 1: Create the EventEmitter Class**
First, let's define the `EventEmitter` class. This will handle all the event registration and triggering logic.

```ts
 class EventEmitter {
    events:any; 
    constructor() {
        this.events = {};
    }

    // Add an event listener
    addEventListener(event:string, callback:()=>any) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // Remove an event listener
    removeEventListener(event:string, callback:()=>any) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb:()=>any) => cb !== callback);
        }
    }

    // Trigger an event
    emit(event:string) {
        if (this.events[event]) {
            this.events[event].forEach((callback:()=>any) => callback());
        }
    }
}
```

---

### **Step 2: Create the Modal Class Using Composition**
Now, instead of inheriting from `EventEmitter`, we’ll pass an instance of `EventEmitter` to the `Modal` class. This way, the `Modal` class doesn’t directly depend on `EventEmitter` but can still use its functionality.

```ts
class Modal {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    addEventListener(event:string, callback:()=>any){
         this.eventEmitter.addEventLister(event, callback);
    }
    removeEventListener(event:string, callback:()=>any){
          this.eventEmitter.removeEventLister(event, callback);
    }
    open() {
        console.log("Modal is opening...");
        this.eventEmitter.emit('open');
    }

    close() {
        console.log("Modal is closing...");
        this.eventEmitter.emit('close');
    }
}
```

---

### **Step 3: Use the Modal Class with EventEmitter**
Now, you can create an instance of `EventEmitter`, pass it to the `Modal` class, and add event listeners.

```javascript
// Create an EventEmitter instance
const eventEmitter = new EventEmitter();

// Create a Modal instance and pass the EventEmitter
const modal = new Modal(eventEmitter);

// Add event listeners
modal.addEventListener('open', () => {
    console.log('Modal opened!');
});

 modal.addEventListener('close', () => {
    console.log('Modal closed!');
});

// Trigger events
modal.open();  // Output: Modal is opening... Modal opened!
modal.close(); // Output: Modal is closing... Modal closed!
```

---

### **Advantages of This Approach**
1. **Loose Coupling**:
   - The `Modal` class doesn’t depend directly on `EventEmitter`. You can easily swap out the `EventEmitter` implementation or use a different event-handling mechanism.

2. **Reusability**:
   - The `EventEmitter` can be reused across multiple components (e.g., `Dropdown`, `Accordion`, etc.) without duplicating code.

3. **Testability**:
   - You can mock the `EventEmitter` in unit tests, making it easier to test the `Modal` class in isolation.

4. **Flexibility**:
   - You can extend or modify the `EventEmitter` class without affecting the `Modal` class.

---

### **Example: Using the Same EventEmitter for Multiple Components**
You can reuse the same `EventEmitter` instance for multiple components, enabling communication between them.

```ts
// Create an EventEmitter instance
const eventEmitter = new EventEmitter();

// Create a Dropdown instance
class Dropdown {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
     addEventListener(event:string, callback:()=>any){
         this.eventEmitter.addEventLister(event, callback);
    }
    removeEventListener(event:string, callback:()=>any){
          this.eventEmitter.removeEventLister(event, callback);
    }
    toggle() {
        console.log("Dropdown toggled...");
        this.eventEmitter.emit('toggle');
    }
}

const dropdown = new Dropdown(eventEmitter);

dropdown.addEventListener('toggle', () => {
    console.log('Dropdown toggled!');
});

// Trigger event
dropdown.toggle(); // Output: Dropdown toggled... Dropdown toggled!
```

---

### **Conclusion**
By using composition, you’ve achieved a clean separation of concerns and made your code more modular and maintainable. This approach is highly scalable and works well for complex UIs where multiple components need to communicate or share behavior.

If you’d like, I can help you extend this further—for example, by adding support for async event handlers, global event buses, or integrating this pattern with a frontend framework like React or Vue. Let me know! 🚀
