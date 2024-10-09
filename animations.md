CSS animations allow you to create smooth transitions and animations for HTML elements without needing JavaScript. Here are the basics to get you started:

### Key Concepts

1. **@keyframes**: Defines the animation sequence by specifying styles at various points during the animation.
2. **animation-name**: Assigns a name to the animation defined in the `@keyframes`.
3. **animation-duration**: Specifies how long the animation takes to complete one cycle.
4. **animation-timing-function**: Defines the speed curve of the animation (e.g., `ease`, `linear`, `ease-in`, `ease-out`).
5. **animation-delay**: Sets a delay before the animation starts.
6. **animation-iteration-count**: Specifies the number of times the animation should repeat.
7. **animation-direction**: Defines whether the animation should play in reverse on alternate cycles.
8. **animation-fill-mode**: Specifies how an element should be styled before and after an animation runs. Here are the possible values (`none`, `forwards`, `backwards`, `both`)

### Example

Here's a simple example that changes the background color of a `div` element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animation Example</title>
    <style>
        /* Define the animation */
        @keyframes colorChange {
            from { background-color: red; }
            to { background-color: yellow; }
        }

        /* Apply the animation to the element */
        .animated-div {
            width: 100px;
            height: 100px;
            background-color: red;
            animation-name: colorChange;
            animation-duration: 4s;
        }
    </style>
</head>
<body>
    <div class="animated-div"></div>
</body>
</html>
```

In this example:
- The `@keyframes` rule defines an animation named `colorChange` that transitions the background color from red to yellow.
- The `.animated-div` class applies this animation to the `div` element, specifying that it should take 4 seconds to complete.
