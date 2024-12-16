

// Fetch the JSON file
fetch('hats.json')
    .then(response => response.json())  // Parse the JSON data
    .then(products => {
        // Get the container where the products will be added
        const productContainer = document.getElementById('product-container');
        
        // Loop through each product and generate HTML for it
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.classList.add('backgrounds');
            
            const imageSlider = document.createElement('div');
            imageSlider.classList.add('image-slider');
            imageSlider.classList.add('hidden');
            // imageSlider.setAttribute('data-mouse-down-at', '0'); // Add the attribute
            // imageSlider.setAttribute('data-prev-percentage','0');

            
            product.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = product.name;
                    img.draggable = false; // Prevent dragging
                    imageSlider.appendChild(img);
            });
            

            const namePara = document.createElement('p');
            namePara.textContent = product.name;

            const pricePara = document.createElement('p');
            pricePara.textContent = product.price;

            productDiv.appendChild(imageSlider);
            productDiv.appendChild(namePara);
            productDiv.appendChild(pricePara);

            // Add the product div to the container
            productContainer.appendChild(productDiv);

            // Initialize the slider for each individual product
            const slider = imageSlider;  // The slider for this specific product
            let currentIndex = 0;
            const images = slider.querySelectorAll('img');
            const totalImages = images.length;
            let intervalId = null; // Initialize variable for interval ID

            // Function to start the slider
            function startSlider() {
                // Immediately show the next image on hover
                currentIndex = (currentIndex + 1) % totalImages;
                slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            // Function to stop the slider and reset to the default image
            function stopSlider() {
                clearInterval(intervalId);
                intervalId = null; // Reset the interval ID

                // Reset to the first image
                currentIndex = 0;
                slider.style.transform = `translateX(0)`;
            }

            // Function to extract color from an image
            function getColorFromImage(imageElement, x, y) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas size to match the image
                canvas.width = imageElement.width;
                canvas.height = imageElement.height;

                // Draw the image onto the canvas
                ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

                // Get pixel data at the specified coordinates
                const pixelData = ctx.getImageData(x, y, 1, 1).data;
                const r = pixelData[0];
                const g = pixelData[1];
                const b = pixelData[2];
                const a = pixelData[3] / 255;

                // Return the color in RGBA format
                return `rgba(${r}, ${g}, ${b}, ${a})`;
            }

            // Function to handle mouse movement over the image
            function onImageHover(event) {
                const imageElement = event.target;

                // Get the relative position of the mouse on the image
                const rect = imageElement.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                // Get the color at the mouse position
                const color = getColorFromImage(imageElement, x, y);
                

                // (Optional) Display the color in a div or tooltip
                // const colorDisplay = document.getElementById('colorDisplay');
                // colorDisplay.style.backgroundColor = color;
                const backgrounds = document.querySelectorAll('.backgrounds');
                const highlights = document.querySelectorAll('.highlights')
                // colorDisplay.textContent = color;
                // backgrounds.forEach(box =>{
                //     box.style.backgroundColor = color;
                // });
            }

            // Add hover event listeners to the current `.product` container
            productDiv.addEventListener('mouseenter', startSlider); // Start sliding on hover
            productDiv.addEventListener('mouseleave', stopSlider);
            productDiv.addEventListener('mousemove', onImageHover); // Get color on hover
            

        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry) =>{
                if(entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else{
                    entry.target.classList.remove('show');
                }
            });
            
        });
        
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((e1) => observer.observe(e1));
        });




        const backgrounds = document.querySelectorAll('.backgrounds');
        const highlights = document.querySelectorAll('.highlights')

        // Array of colors to cycle through
        const highlightcolors = ['#2F3C7E', '#2C5F2D', '#330000', '#31473A', '#CC313D'];
        const backgroundcolors =['#FBEAEB', '#97BC62','#73605B','#EDF4F2','#F7C5CC']

        let colorIndex = 0; // Index to track the current color

        // Function to change the background color
        function changeColor() {
            colorIndex = (colorIndex + 1) % highlightcolors.length; // Cycle through the colors
            highlights.forEach(box => {
                box.style.color = highlightcolors[colorIndex]; // Set the new color
            });
            backgrounds.forEach(box =>{
                box.style.backgroundColor = backgroundcolors[colorIndex];
            });
        }

         // Change the color every 5 seconds
        setInterval(changeColor, 5000);



    })
    .catch(error => {
        console.error('Error fetching the products:', error);
    });



