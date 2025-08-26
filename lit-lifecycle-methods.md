# Lit Lifecycle Methods - Complete Reference

## Overview
Lit components inherit from `LitElement` which provides both standard Web Component lifecycle methods and Lit-specific reactive update cycle methods. Understanding the order of execution is crucial for proper component behavior.

## Complete Lifecycle Order

### 1. **constructor()**
- **When**: Called when the element instance is created (before DOM insertion)
- **Purpose**: Initialize properties, set up initial state
- **DOM Access**: ❌ No DOM access yet
- **Use Cases**: 
  - Initialize private properties
  - Set up initial state
  - Bind event handlers

```typescript
constructor() {
    super();
    this.myProperty = 'initial value';
    this.addEventListener('click', this.handleClick);
}
```

### 2. **connectedCallback()**
- **When**: Called when element is inserted into the DOM
- **Purpose**: Setup that requires DOM presence
- **DOM Access**: ⚠️ Shadow DOM not ready yet
- **Use Cases**:
  - Add document-level event listeners
  - Start timers or intervals
  - Fetch initial data
  - Setup external libraries (with caution)

```typescript
connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
    this.fetchInitialData();
}
```

### 3. **attributeChangedCallback(name, oldValue, newValue)**
- **When**: Called when observed attributes change
- **Purpose**: React to attribute changes
- **DOM Access**: ⚠️ Depends on timing
- **Use Cases**: 
  - Custom attribute processing
  - Converting attributes to properties

```typescript
attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'my-attr') {
        // Handle attribute change
    }
}
```

### 4. **requestUpdate() / Property Changes**
- **When**: Triggered by property changes or manual calls
- **Purpose**: Initiates the reactive update cycle
- **DOM Access**: ❌ Update not complete yet

### 5. **shouldUpdate(changedProperties)**
- **When**: Before each update cycle
- **Purpose**: Determine if component should re-render
- **DOM Access**: ❌ No DOM changes yet
- **Use Cases**: Performance optimization

```typescript
shouldUpdate(changedProperties: PropertyValues) {
    // Only update if important properties changed
    return changedProperties.has('criticalProperty');
}
```

### 6. **willUpdate(changedProperties)**
- **When**: Before render, but after shouldUpdate
- **Purpose**: Compute values needed for rendering
- **DOM Access**: ❌ Pre-render phase
- **Use Cases**: Calculate derived state

```typescript
willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('items')) {
        this.sortedItems = this.items.sort();
    }
}
```

### 7. **render()**
- **When**: During each update cycle
- **Purpose**: Return the template to render
- **DOM Access**: ❌ Template creation phase
- **Use Cases**: Define component template

```typescript
render() {
    return html`
        <div>${this.message}</div>
        <slot></slot>
    `;
}
```

### 8. **firstUpdated(changedProperties)**
- **When**: After first render completes (only once)
- **Purpose**: One-time setup requiring rendered DOM
- **DOM Access**: ✅ Full DOM access available
- **Use Cases**: 
  - Initialize third-party libraries
  - Focus elements
  - Measure DOM elements
  - Setup that needs rendered content

```typescript
firstUpdated(changedProperties: PropertyValues) {
    // DOM is ready, safe to access shadow DOM elements
    const button = this.shadowRoot?.querySelector('button');
    button?.focus();
    
    // Initialize external libraries
    if (window.initFlowbite) {
        window.initFlowbite();
    }
}
```

### 9. **updated(changedProperties)**
- **When**: After every render completes
- **Purpose**: React to completed updates
- **DOM Access**: ✅ Full DOM access available
- **Use Cases**: 
  - React to DOM changes
  - Update external libraries
  - Trigger animations

```typescript
updated(changedProperties: PropertyValues) {
    if (changedProperties.has('isOpen')) {
        // React to modal open/close
        this.updateBodyScroll();
    }
}
```

### 10. **updateComplete Promise**
- **When**: Resolves after update cycle completes
- **Purpose**: Async operations after render
- **DOM Access**: ✅ Full DOM access guaranteed

```typescript
async someMethod() {
    await this.updateComplete;
    // Now safe to access updated DOM
    const element = this.shadowRoot?.querySelector('.new-element');
}
```

### 11. **disconnectedCallback()**
- **When**: Element removed from DOM
- **Purpose**: Cleanup resources
- **DOM Access**: ⚠️ Element being removed
- **Use Cases**: 
  - Remove event listeners
  - Cancel timers/intervals
  - Cleanup external resources

```typescript
disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
    clearInterval(this.timer);
}
```

## Practical Examples

### Data Fetching Pattern
```typescript
// ❌ Wrong - too early
constructor() {
    super();
    this.fetchData(); // DOM not ready
}

// ✅ Good options
connectedCallback() {
    super.connectedCallback();
    this.fetchData(); // Component in DOM
}

// ✅ Better for DOM-dependent operations
firstUpdated() {
    this.fetchData(); // DOM fully rendered
}
```

### External Library Integration
```typescript
// ✅ Correct timing for external libraries
firstUpdated() {
    // DOM is ready, safe to initialize libraries
    if (window.initFlowbite) {
        window.initFlowbite();
    }
}

updated(changedProperties) {
    // Reinitialize if needed after updates
    if (changedProperties.has('importantProperty')) {
        window.reinitializeLibrary();
    }
}
```

### Event Management
```typescript
connectedCallback() {
    super.connectedCallback();
    // Global listeners
    document.addEventListener('click', this.handleDocumentClick);
}

firstUpdated() {
    // Internal element listeners
    const button = this.shadowRoot?.querySelector('button');
    button?.addEventListener('click', this.handleClick);
}

disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup
    document.removeEventListener('click', this.handleDocumentClick);
}
```

## Visual Lifecycle Flow

```
Element Created
      ↓
  constructor()
      ↓
Element Added to DOM
      ↓
  connectedCallback()
      ↓
Property/Attribute Changes
      ↓
  attributeChangedCallback() (if applicable)
      ↓
  shouldUpdate() → false? → End
      ↓ true
  willUpdate()
      ↓
  render()
      ↓
First Render? → firstUpdated()
      ↓
  updated()
      ↓
  updateComplete resolves
      ↓
...more updates...
      ↓
Element Removed from DOM
      ↓
  disconnectedCallback()
```

## Key Timing Rules

1. **DOM Access**: Only safe in `firstUpdated()`, `updated()`, and after `updateComplete`
2. **External Libraries**: Initialize in `firstUpdated()` or after `updateComplete`
3. **Data Fetching**: Usually in `connectedCallback()` or `firstUpdated()`
4. **Cleanup**: Always in `disconnectedCallback()`
5. **Performance**: Use `shouldUpdate()` to prevent unnecessary renders

## Common Pitfalls

- ❌ Accessing shadow DOM in `constructor()` or `connectedCallback()`
- ❌ Forgetting to call `super.lifecycleMethod()`
- ❌ Not cleaning up in `disconnectedCallback()`
- ❌ Heavy computations in `render()`
- ❌ Side effects in `render()`
- ❌ Assuming DOM is ready in `connectedCallback()`

## Best Practices

### ✅ Do:
- Always call `super.lifecycleMethod()` first
- Use `firstUpdated()` for external library initialization
- Clean up resources in `disconnectedCallback()`
- Use `shouldUpdate()` for performance optimization
- Keep `render()` pure (no side effects)

### ❌ Don't:
- Access shadow DOM before `firstUpdated()`
- Forget to remove event listeners
- Perform async operations in `render()`
- Modify state directly in lifecycle methods (use requestUpdate())

This lifecycle understanding is essential for building robust Lit components that integrate well with external libraries and manage resources properly.
