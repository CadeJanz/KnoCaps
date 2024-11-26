

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
            
            const imageSlider = document.createElement('div');
            imageSlider.classList.add('image-slider');
            
            product.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = product.name;
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

            // Add hover event listeners to the current `.product` container
            productDiv.addEventListener('mouseenter', startSlider); // Start sliding on hover
            productDiv.addEventListener('mouseleave', stopSlider);  // Reset to the default image when not hovering
        });
    })
    .catch(error => {
        console.error('Error fetching the products:', error);
    });





