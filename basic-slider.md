# I built a basic slider
I'll recommend using a library like Swiperjs though. I just wanted to see how it works
```html
  <!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./bootstrap.min.css">
	<title>Basic Slider</title>
	<style> 
		/* Basic reset */

  :root{
    --slide-duration:3s;
    --slide-delay:3s;
  }
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Style for the slider container */
.slider-container {
   width:20rem;
   min-height:30rem;
   overflow:hidden;
   position:relative;
   margin:50px auto;
}

/* Style for each slide */
.slide {
  width:100%;
  position: absolute;
  top:0;
  left:100%;
  display:flex;
  justify-content:center;
  align-items:center;
}

/* Animation for sliding */
@keyframes slide{
    0% {
    left: 100%;
    opacity: 0;
  }

  10% {
    left: 0;
    opacity: 1;
  }
  90%{
    left:0;
    opacity:1;
  }
  100%{
    left:-100%;
    opacity:0;
  }
}


.slide:nth-child(1){
  animation:slide var(--slide-duration);
}

.slide:nth-child(2){
  animation: slide var(--slide-duration) var(--slide-delay);
}

.slide:nth-child(3){
  animation: slide var(--slide-duration) calc(2 * var(--slide-delay));
}



@keyframes change-bg{
  0%   {background-color: red;}
  25%  {background-color: yellow;}
  50%  {background-color: blue;}
  100% {background-color: green;}
}
/* Test */
.box{
  width:100px;
  height:100px;
  /*background-color:orange;*/
  margin:0 auto;
  animation-name:change-bg;
  animation-duration:4s;
  animation-delay:2s;
  animation-iteration-count:3;
  animation-fill-mode: both;
  /*animation-direction:normal;*/
  /*animation-timing-function:ease;*/

  /* shorthand
    animation: name duration function delay count direction
   */
}

.card-img-top{
  height:5rem;
  width: 5rem;
  margin:1rem;
  object-fit:cover;
  border-radius:50%;
}
	</style>
</head>
<body>
  <div class="slider-container">
   <!--slide 1 -->
    <div class="slide">
      <div class="card" style="width: 18rem;">
      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    </div>

   <!--slide 2 -->

    <div class="slide">
      <div class="card" style="width: 18rem;">
      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    </div>
   

   <!--slide 3 -->
   <div class="slide">
      <div class="card" style="width: 18rem;">
      <img src="https://spotlight.tailwindui.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.51a13c67.jpg&w=128&q=80" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    </div>
   
   
  </div>
  <!--
  <div class="box"> 

  </div>
--> 
</body>
</html>

```
