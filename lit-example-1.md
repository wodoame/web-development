# Dynamic Table with Skeleton Loading - Code Documentation

## Overview

This project implements a dynamic data table that fetches user information from an external API and displays it with a skeleton loading state. The application combines **Lit Elements** for custom web components, **Alpine.js** for reactive data management, and **Bootstrap** for styling.

## Architecture

The application follows a component-based architecture with the following key parts:

- **Alpine.js Context**: Manages application state and API calls
- **Lit Elements**: Custom web components for rendering tables
- **Bootstrap**: Provides styling and responsive design
- **JSONPlaceholder API**: External data source for user information

## File Structure

```
├── index.html          # Main HTML file with Alpine.js integration
├── main.js            # Base class and Alpine.js configuration
├── table.js           # Main data table component
├── tableSkeleton.js   # Loading skeleton component
└── [External dependencies]
    ├── lit-core.min.js    # Lit Element framework
    ├── alpine.min.js      # Alpine.js framework
    └── bootstrap CSS      # Styling framework
```
## Code
`index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div x-data="tableContext" class="p-4">
    <!-- skeleton -->
    <template x-if="!users">
        <table-skeleton rows="5"></table-skeleton>
    </template>
    <template x-if="users">
        <my-table :data="users" id="my-table"></my-table>
    </template>
 </div>
 <script type="module" src="lit-core.min.js"></script>
 <script type="module" src="tableSkeleton.js"></script>
 <script type="module" src="table.js"></script>
 <script type="module" src="main.js"></script>
 <script src="alpine.min.js" defer></script>
</body>
</html>
```

`main.js`
```js
import { LitElement, html} from "./lit-core.min.js";

export class UnscopedCSSElement extends LitElement{
    createRenderRoot(){
        return this // prevent scoped css
    }
}

document.addEventListener('alpine:init', ()=>{
  Alpine.data('tableContext', ()=>({
    users: undefined,
    async fetchUsers(){
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.text())
      .then(jsonText =>{
        this.users = jsonText; 
        console.log(this.users);
      })
    },
    init(){
      this.fetchUsers();
    }
  }))
}) 
```

`table.js`
```js
import { UnscopedCSSElement } from "./main.js";
import { html } from "./lit-core.min.js";

class MyTable extends UnscopedCSSElement{

   static properties = {
     data: {type:String}
   }

    populate(data){
        let users = JSON.parse(data);
        let res = users.map((user, i)=>html`
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        </tr>
        `);
        return res
    }

    render(){
        return html`
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
  <tbody>
    ${this.populate(this.data)}
  </tbody>
</table>
        `;
    }
};

customElements.define('my-table', MyTable);
```

`tableSkeleton.js`
```js
import { UnscopedCSSElement } from "./main.js";
import { html } from "./lit-core.min.js";

class TableSkeleton extends UnscopedCSSElement{
    static properties = {
      rows: {type:Number}
    }

    generateRows(rows) {
    const res = [];
    for (let i = 0; i < rows; i++) {
        res.push(html`
            <tr>
                <th scope="row">${i + 1}</th>
                <td><span class="placeholder col-6"></span></td>
                <td><span class="placeholder col-6"></span></td>
                <td><span class="placeholder col-6"></span></td>
            </tr>
        `);
    }
    return res;
    }

    render(){
        return html`
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                ${this.generateRows(this.rows)}
            </tbody>
        </table>
        `
    }
}

customElements.define('table-skeleton', TableSkeleton);
```

## Components

### 1. Main HTML Structure (`index.html`)

The HTML file serves as the application entry point:

```html
<div x-data="tableContext" class="p-4">
    <!-- Skeleton loader (shown while loading) -->
    <template x-if="!users">
        <table-skeleton rows="5"></table-skeleton>
    </template>
    
    <!-- Main table (shown after data loads) -->
    <template x-if="users">
        <my-table :data="users" id="my-table"></my-table>
    </template>
</div>
```

**Key Features:**
- Uses Alpine.js `x-data` directive to bind to `tableContext`
- Conditional rendering with `x-if` templates
- Shows skeleton while `users` is undefined
- Displays table once data is loaded

### 2. Base Class and Alpine Context (`main.js`)

#### UnscopedCSSElement Class

```javascript
export class UnscopedCSSElement extends LitElement {
    createRenderRoot() {
        return this // Prevents scoped CSS encapsulation
    }
}
```

This base class extends Lit Element to disable Shadow DOM CSS scoping, allowing Bootstrap classes to work properly.

#### Alpine.js Data Context

```javascript
Alpine.data('tableContext', () => ({
    users: undefined,
    async fetchUsers() {
        // Fetches data from JSONPlaceholder API
        // Stores response as string in this.users
    },
    init() {
        this.fetchUsers(); // Auto-fetch on initialization
    }
}))
```

**Responsibilities:**
- Manages application state (`users` data)
- Handles API communication
- Automatically initializes data fetching

### 3. Data Table Component (`table.js`)

The `MyTable` component renders the main data table:

#### Properties
```javascript
static properties = {
    data: {type: String} // JSON string of user data
}
```

#### Key Methods

**`populate(data)`**
- Parses JSON string into user objects
- Maps each user to a table row using Lit's `html` template
- Returns array of HTML template results

**`render()`**
- Returns complete table structure with Bootstrap classes
- Includes header row with column definitions
- Populates body using `populate()` method

#### Table Structure
| Column | Data Source |
|--------|-------------|
| # | Row index (1-based) |
| Name | `user.name` |
| Username | `user.username` |
| Email | `user.email` |
| Phone | `user.phone` |
| Website | `user.website` |

### 4. Skeleton Loader Component (`tableSkeleton.js`)

The `TableSkeleton` component provides a loading state:

#### Properties
```javascript
static properties = {
    rows: {type: Number} // Number of skeleton rows to display
}
```

#### Key Methods

**`generateRows(rows)`**
- Creates specified number of placeholder rows
- Uses Bootstrap's `placeholder` classes for loading animation
- Returns array of skeleton row templates

**`render()`**
- Renders table structure with placeholder content
- Maintains visual consistency with main table

## Data Flow

1. **Initialization**: Alpine.js initializes `tableContext` and calls `fetchUsers()`
2. **Loading State**: While `users` is undefined, `table-skeleton` is displayed
3. **API Call**: `fetchUsers()` makes HTTP request to JSONPlaceholder API
4. **Data Processing**: Response is stored as JSON string in `users` property
5. **Rendering**: Alpine.js reactively switches to `my-table` component
6. **Table Population**: `MyTable` parses JSON and renders user data

## API Integration

The application fetches data from:
```
https://jsonplaceholder.typicode.com/users
```

**Response Format**: Array of user objects with properties:
- `name`: Full name
- `username`: Username
- `email`: Email address
- `phone`: Phone number
- `website`: Website URL

## Styling

The application uses **Bootstrap 5.3.2** for:
- Table styling (`table`, `table-hover`, `table-bordered`)
- Responsive layout
- Loading placeholders (`placeholder`, `col-6`)
- Spacing utilities (`p-4`)

## Technology Stack

- **Lit Elements**: Custom web components with reactive properties
- **Alpine.js**: Lightweight reactive framework for DOM manipulation
- **Bootstrap**: CSS framework for styling and components
- **Vanilla JavaScript**: ES6 modules and modern JavaScript features

## Key Features

✅ **Skeleton Loading**: Smooth loading experience with placeholder content  
✅ **Reactive Updates**: Automatic UI updates when data changes  
✅ **Component Architecture**: Reusable, modular components  
✅ **Responsive Design**: Bootstrap-powered responsive layout  
✅ **Modern JavaScript**: ES6 modules and template literals  
✅ **External API Integration**: Real-time data fetching  

## Usage

1. Include all required dependencies (Lit, Alpine.js, Bootstrap)
2. Load the HTML file in a web browser
3. The application automatically fetches and displays user data
4. Skeleton loader shows during initial load time

This architecture provides a solid foundation for building dynamic, component-based web applications with modern JavaScript frameworks.
