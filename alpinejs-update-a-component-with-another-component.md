### A component called toast.html
```html
  
<div x-data="toast" x-show="open" id="dismiss-alert" 
x-effect="setup"
class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500" role="alert" tabindex="-1" aria-labelledby="hs-dismiss-button-label">
  <div class="flex items-center ">
    <div class="shrink-0">
      <svg class="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    </div>

    <div class="ms-2">
      <h3 id="hs-dismiss-button-label" class="text-sm font-medium">
        You have successfully logged in
      </h3>
    </div>

    <div class="ps-3 ms-auto">
      <div class="-mx-1.5 -my-1.5">
        <button
         @click="close"
         type="button" class="inline-flex bg-teal-50 rounded-lg p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:bg-teal-100 dark:bg-transparent dark:text-teal-600 dark:hover:bg-teal-800/50 dark:focus:bg-teal-800/50" data-hs-remove-element="#dismiss-alert">
          <span class="sr-only">Dismiss</span>
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- 
    since every element has it's own state if you want a component to be able to update another component, 
    you have to pass the reference to the property in question to a global function.
    So I created 'toggleToast' which will store a reference to the 'open' property (through the setup function).
    When 'toggleToast' is called it updates the state for that particular component
    similar to react where the setState function ([state, setState]) allows you to update some state 
 -->

<script>
    let toggleToast;
    (function(){
        document.addEventListener('alpine:init', ()=>{
          Alpine.data('toast',  ()=>({
              open:true, 

              close(){
                  this.open = false;
              }, 
            
              // This method is called by x-effect
              // You could also put this in x-init="$nextTick(()=>{....}" eg. x-init="$nextTick(setup)"
              setup(){
                 console.log('this ran after the component initialized');
                    toggleToast = () => {
                    this.open = ! this.open;
                 };
              }
          }))
        });
      })()
</script>
```

since every element has it's own state if you want a component to be able to update another component, 
you have to pass the reference to the properties to a global function
so I created 'toggleToast' which will store a reference to the 'open' property
when 'toggleToast' is called it updates the state for that particular component
similar to react where the setState function ([state, setState]) allows you to update some state. 

### another django template where I'm using an external button to toggle the toast
```html
{% extends 'base.html' %}
{% load static %}

{% block content %}
 <main class="p-4">
    {% include "components/toast.html" %}
    <div class="my-2">
      <button x-data @click="toggleToast" class="btn">
          Click to toggle toast     
      </button>
    </div>
 </main>

 <script src="{% static 'js/alpine.min.js' %}"></script>
{% endblock %}
```
