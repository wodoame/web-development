Slots in Lit are a powerful feature for content projection, allowing you to create reusable components with customizable content areas. Here's how they work:

## Basic Slot Concept

Slots let you define "holes" in your component template where external content can be inserted.

## 1. Basic Slot Usage

### Component with a slot:
```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-card')
export class MyCard extends LitElement {
  render() {
    return html`
      <div class="card">
        <h2>Card Title</h2>
        <div class="content">
          <slot></slot> <!-- Default slot -->
        </div>
      </div>
    `;
  }
}
```

### Using the component:
```html
<my-card>
  <p>This content goes into the slot!</p>
  <button>Click me</button>
</my-card>
```

## 2. Named Slots

You can have multiple slots with specific names:

```typescript
@customElement('my-layout')
export class MyLayout extends LitElement {
  render() {
    return html`
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot> <!-- Default slot -->
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    `;
  }
}
```

### Using named slots:
```html
<my-layout>
  <h1 slot="header">Page Title</h1>
  <p>This goes in the main content area (default slot)</p>
  <p slot="footer">Copyright 2025</p>
</my-layout>
```

## 3. Slot Fallback Content

You can provide default content that shows when no content is slotted:

```typescript
@customElement('my-button')
export class MyButton extends LitElement {
  render() {
    return html`
      <button>
        <slot>Default Button Text</slot>
      </button>
    `;
  }
}
```

```html
<!-- Uses fallback content -->
<my-button></my-button>

<!-- Uses custom content -->
<my-button>Custom Text</my-button>
```

## 4. Conditional Slots

Check if a slot has content before rendering:

```typescript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('conditional-card')
export class ConditionalCard extends LitElement {
  render() {
    return html`
      <div class="card">
        ${this.hasSlotContent('header') ? html`
          <header>
            <slot name="header"></slot>
          </header>
        ` : ''}
        
        <main>
          <slot></slot>
        </main>
        
        ${this.hasSlotContent('actions') ? html`
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        ` : ''}
      </div>
    `;
  }

  private hasSlotContent(name?: string): boolean {
    const selector = name ? `[slot="${name}"]` : ':not([slot])';
    return this.querySelector(selector) !== null;
  }
}
```

## 5. Slot Change Events

Listen for when slot content changes:

```typescript
@customElement('dynamic-content')
export class DynamicContent extends LitElement {
  render() {
    return html`
      <div>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes();
    console.log('Slot content changed:', nodes);
  }
}
```

## 6. Advanced Slot Manipulation

### Getting slotted elements:
```typescript
@customElement('advanced-slot')
export class AdvancedSlot extends LitElement {
  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot');
    const assignedElements = slot?.assignedElements();
    console.log('Slotted elements:', assignedElements);
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
```

### Filtering slotted content:
```typescript
@customElement('filtered-slot')
export class FilteredSlot extends LitElement {
  render() {
    return html`
      <div>
        <slot @slotchange=${this.filterContent}></slot>
      </div>
    `;
  }

  private filterContent(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const elements = slot.assignedElements();
    
    // Hide elements that don't match criteria
    elements.forEach(el => {
      if (!el.classList.contains('allowed')) {
        (el as HTMLElement).style.display = 'none';
      }
    });
  }
}
```

## 7. Practical Example - Modal Component

```typescript
@customElement('app-modal')
export class AppModal extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-content {
      background: white;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
    }
    
    .header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    
    .body {
      padding: 1rem;
    }
    
    .footer {
      padding: 1rem;
      border-top: 1px solid #eee;
      text-align: right;
    }
  `;

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          ${this.hasSlotContent('header') ? html`
            <div class="header">
              <slot name="header"></slot>
            </div>
          ` : ''}
          
          <div class="body">
            <slot></slot>
          </div>
          
          ${this.hasSlotContent('footer') ? html`
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private hasSlotContent(name?: string): boolean {
    const selector = name ? `[slot="${name}"]` : ':not([slot])';
    return this.querySelector(selector) !== null;
  }
}
```

### Using the modal:
```html
<app-modal>
  <h2 slot="header">Confirmation</h2>
  <p>Are you sure you want to delete this item?</p>
  <div slot="footer">
    <button>Cancel</button>
    <button>Delete</button>
  </div>
</app-modal>
```

## Key Benefits of Slots:

1. **Reusability**: Create flexible components that can be customized
2. **Separation of Concerns**: Component structure separate from content
3. **Composition**: Build complex UIs by composing simpler components
4. **Maintainability**: Changes to slotted content don't require component updates

Slots are essential for creating truly reusable and flexible Lit components!

Similar code found with 1 license type
