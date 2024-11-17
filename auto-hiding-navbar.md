# Example code
```html
  <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<style>
	.navbar {
  transition: transform 0.3s ease;
  position: fixed;
  background-color:rebeccapurple;
  top: 0;
  left: 0;
  width: 100%;
  height:50px;
  z-index: 1000;
}

.navbar.hide {
  transform: translateY(-100%);
}

	</style>
</head>
<body>
     <nav class="navbar">
         
     </nav>
      
      <!-- divs to simulate a lot of content -->
     <div style="height:100vh;">
     	  
     </div> <div style="height:100vh;">
     	  
     </div>

     <script type="text/javascript">
     	let lastScroll = 0;
     	const navbar = document.querySelector('.navbar');
     	window.addEventListener("scroll", ()=>{
     		const currentScroll = window.pageYOffset;
        // when scrolling down and we've scrolled past a certain distance like 100px hide the navbar
     		if(currentScroll > lastScroll && currentScroll > 100){
     			 navbar.classList.add('hide');
     		}  // if you are scrolling up
        else if(currentScroll < lastScroll){
          navbar.classList.remove('hide');
        }
     		lastScroll = currentScroll <= 0? 0: currentScroll; // prevent negative values
     	})
     </script>
});

 </script> -->
</body>
</html>
```
