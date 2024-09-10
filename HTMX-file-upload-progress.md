# some example code I wrote
```html
  {% extends 'base.html' %}

{% block body %}
  <body>
        
        <style>
            .upload--progress{
                background-color: #2563eb;
            }
            
            .upload--success{
                background-color: #14b8a6;
            }
        </style>

        <div class="p-4">
            <form id="form" hx-encoding="multipart/form-data"  hx-post="/htmx-test/">
                <div class="flex space-x-3 items-center">
                    <label for="file-input" type="button" class="py-3 font-bold px-4 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                      Upload a file
                    </label>
                    <input name="file" id="file-input" class="file:hidden" type="file">
                </div>

                  <!-- Progress Bar -->
            <div class="flex items-center gap-x-3 whitespace-nowrap w-1/4 p-2">
                <div class="flex w-full h-2  bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
                    <div id="progress" class="upload--progress flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"></div>
                </div>
                <div class="w-6 text-end flex space-x-2">
                    <span id="upload-value" class="text-sm text-gray-800 dark:text-white">0%</span>
                    <span class="hidden" id="upload-success-icon">
                        <svg class="shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                          </svg>
                    </span>
                </div>
            </div>
            <!-- End Progress Bar -->


                <button id="submit-button" class="hidden py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  Submit
                </button>
            </form>
            <!-- <progress id="progress" value="0" max="100"></progress> -->

    <div>
      

    </div>
    <!-- End File Uploading Progress Form -->

</div>


  </body>

   <script>
        const progressElement = htmx.find('#progress');
        const form = document.getElementById('form');
        const fileInput = document.getElementById('file-input');
        const uploadValueSpan = document.getElementById('upload-value');

        const progressHandler = (e)=>{
            console.log(progressElement);
            const currentValue = (e.detail.loaded / e.detail.total) * 100
            uploadValueSpan.innerText = `${Math.round(currentValue)}%`;
            progressElement.setAttribute('style', `width: ${currentValue}%`);
            if(currentValue == 100){
                progressElement.classList.remove('upload--progress');
                progressElement.classList.add('upload--success');
                document.getElementById('upload-success-icon').classList.remove('hidden');
            };
        };
         
        const clearProgressBar = ()=>{
            progressElement.setAttribute('style', `width: 0%`); 
            progressElement.classList.remove('upload--success'); 
            progressElement.classList.add('upload--progress'); 
            document.getElementById('upload-success-icon').classList.add('hidden');
        };

        const uploadHandler = ()=>{
            clearProgressBar();
            document.getElementById('submit-button').click();
        };

        form.addEventListener('htmx:xhr:progress', progressHandler);
        fileInput.addEventListener('change', uploadHandler);
        

        const cleanup = ()=>{
            form.removeEventListener('htmx:xhr:progress', progressHandler);
            fileInput.removeEventListener('change', uploadHandler); 
        }

        window.addEventListener('unload', cleanup);
        
   </script>
   
   <script>
   
   </script>
{% endblock %}
``` 
