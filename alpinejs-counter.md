# simple counter I made
```html
<!--remember the component must begin with x-data-->
<div x-data="counter">
    <!-- the button -->
   <button
   @click="increment()"
   type="button"
   class="py-3 px-4 
   inline-flex items-center gap-x-2
   text-sm font-medium rounded-full border border-transparent
   bg-blue-600 text-white hover:bg-blue-700 focus:outline-none
   focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
      Button
  </button>

  <!-- counter value is displayed here -->
  <div id="count" class="inline-block p-2">
    Count: <span x-text="count"></span>
  </div>
</div>

<script>
    (function(){
      document.addEventListener('alpine:init', ()=>{
        Alpine.data('counter',  ()=>({
            count: 0,

            increment(){
                this.count++;
            }
        }))
      });
    })()
</script>
  
```
### In the django template
```html
  {% extends 'base.html' %}
{% load static %}

{% block content %}
 <main class="p-4">
   {% include "components/counter.html" %}
 </main>
 
 <script src="{% static 'js/alpine.min.js' %}"></script>
{% endblock %}
```
