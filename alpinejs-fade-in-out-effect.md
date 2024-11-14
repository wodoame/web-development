# Example code I wrote
```html
   <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./bootstrap.min.css">
	<script src="./alpine.min.js" defer></script>
	<title>CSS selectors</title>
	<style> 
		.hide{
			visibility:hidden;
			opacity:0;
			transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
			transform:translateX(50%);
		}

		.show{
			visibility: visible;
			opacity:1;
		}

	</style>
</head>
<body class="p-4">

<div class="card w-50 mb-3 mx-auto" :class="{'show': open, 'hide': !open}"  x-data="card">
   <div class="card-header d-flex justify-content-end"><button class="btn-close" @click="hide"></button></div>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This app now supports theme changes. Visit the theme store to pick a theme.</p>
    <a href="#" class="btn btn-primary" @click="hide">Close</a>
  </div>
</div>

 <div>
 	<button class="btn btn-primary" x-data @click="show">Open</button> 
 </div>
   <script> 
     let show;
   	 document.addEventListener('alpine:init', ()=>{
   	    Alpine.data('card', ()=>({
   	    	open: false, 
   	    	init(){
   	    		show = ()=>{
   	    			this.show();
   	    		};
   	    	},
   	    	show(){
   	    		this.open = true;
   	    	}, 

   	    	hide(){
   	    		this.open = false;
   	    	}

   	    }));
   	 });
   </script>
</body>
</html>
```
