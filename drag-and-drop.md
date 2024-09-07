# some example code I wrote
```html
  {% extends 'base.html' %}
{% block body %}
    <body>
          <div class="p-4">
            <!-- below is the video and the final section contains how to handle files -->
             <!-- https://www.youtube.com/watch?v=OHTudicK7nY -->

              <!-- drop zones -->
               <style>
                  .drop-zone{
                      display:flex; 
                      justify-content: center;
                      align-items:center;
                      border-width:2px;
                  }

                  .drop-zone--over{
                    border-color:#22c55e;
                  }
               </style>

              <div class="flex space-x-2 mt-2">
                   <div class="drop-zone border-black w-20 h-20">
                        <div id="draggable-element" class="w-16 h-16 bg-indigo-500 cursor-grab rounded-sm" draggable="true">
            
                        </div>
                   </div>

                   <div class="drop-zone border-black border w-20 h-20"></div>
                   <div class="drop-zone border-black border w-20 h-20"></div>

                   <div class="drop-zone border-black border w-20 h-20"></div>
                   <div class="drop-zone border-black border w-20 h-20"></div>

                   <div class="drop-zone border-black border w-20 h-20"></div>
              </div>

          </div>
    </body>

    <script>
        const checkDropzones = (dropzones, droppedElement)=>{
            dropzones.forEach((dropzone)=>{
                if(!dropzone.contains(droppedElement)){
                    dropzone.classList.remove('drop-zone--over');
                }
                else{
                    dropzone.classList.add('drop-zone--over');
                }
            })
        };


        const draggableElement = document.getElementById('draggable-element');
        const dropzones = document.querySelectorAll('.drop-zone'); 
        draggableElement.addEventListener('dragstart', e=>{
            e.dataTransfer.setData('text/plain', draggableElement.id)
        })

        dropzones.forEach((dropzone)=>{
            dropzone.addEventListener('dragover', e=>{
                e.preventDefault(); 
                dropzone.classList.add('drop-zone--over')
            })

            dropzone.addEventListener('dragleave', e=>{
                dropzone.classList.remove('drop-zone--over');
                checkDropzones(dropzones, draggableElement); // If the element is dropped somewhere else the drop-zone--over class is not restored
            });

            dropzone.addEventListener('drop', e=>{
                e.preventDefault(); 
                const id = e.dataTransfer.getData('text/plain'); 
                const selectedElement = document.getElementById(id); 
                dropzone.appendChild(selectedElement);
                checkDropzones(dropzones, selectedElement);
            })
        });

        checkDropzones(dropzones, draggableElement);
    </script>

{% endblock %}
```
events: `dragstart`, `dragleave`, `dragover`, `drop`
