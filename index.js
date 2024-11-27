

// Fetch the JSON file
fetch('hats.json')
    .then(response => response.json())  // Parse the JSON data
    .then(products => {
        // Get the container where the products will be added
        const productContainer = document.getElementById('image-track');
        
        // Loop through each product and generate HTML for it
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            
            const imageSlider = document.createElement('div');
            imageSlider.classList.add('image-slider');
            // imageSlider.setAttribute('data-mouse-down-at', '0'); // Add the attribute
            // imageSlider.setAttribute('data-prev-percentage','0');

            
            product.images.forEach((image, index) => {
                if (index === 0) { // Only for the first image
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = product.name;
                    img.draggable = false; // Prevent dragging
                    imageSlider.appendChild(img);
                }
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

            // // Initialize the slider for each individual product
            // const slider = imageSlider;  // The slider for this specific product
            // let currentIndex = 0;
            // const images = slider.querySelectorAll('img');
            // const totalImages = images.length;
            // let intervalId = null; // Initialize variable for interval ID

            // // Function to start the slider
            // function startSlider() {
            //     // Immediately show the next image on hover
            //     currentIndex = (currentIndex + 1) % totalImages;
            //     slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            // }

            // // Function to stop the slider and reset to the default image
            // function stopSlider() {
            //     clearInterval(intervalId);
            //     intervalId = null; // Reset the interval ID

            //     // Reset to the first image
            //     currentIndex = 0;
            //     slider.style.transform = `translateX(0)`;
            // }

            // // Add hover event listeners to the current `.product` container
            // productDiv.addEventListener('mouseenter', startSlider); // Start sliding on hover
            // productDiv.addEventListener('mouseleave', stopSlider);
            
            // Reset to the default image when not hovering

        // const track = document.getElementById("image-track")   
        // window.onmousedown = e => {
        //     track.dataset.mouseDownAt= e.clientX;
        // }
        // window.onmouseup = () => {
        //     track.dataset.mouseDownAt = "0";
        //     track.dataset.prevPercentage = track.dataset.percentage;
        // }
        // window.onmousemove = e => {
        // if(track.dataset.mouseDownAt === "0")return;

        // const mouseDelta = parseFloat(track.dataset.mouseDownAt) -e.clientX, 
        // maxDelta = window.innerWidth /2;

        // const percentage = (mouseDelta / maxDelta) * -100,
        //     nextPercentage =parseFloat(track.dataset.prevPercentage) + percentage;
        

        // track.dataset.percentage = nextPercentage;
        
        // // track.style.transform = `translate(${nextPercentage}%, -50%)`;
        // track.animate(
        //     [
        //         { transform: `translate(${track.dataset.percentage || 0}%, -50%)` }, // Starting point
        //         { transform: `translate(${nextPercentage}%, -50%)` } // End point
        //     ],
        //     {
        //         duration: 1200,
        //         fill: "forwards"
        //     }
        // );
        

        // for (const image of track.getElementsByTagName("img")) {
        //     image.animate(
        //         [
        //             { objectPosition: `${track.dataset.percentage || 0}% 50%` }, // Starting position
        //             { objectPosition: `${nextPercentage}% 50%` } // End position
        //         ],
        //         {
        //             duration: 1200,
        //             fill: "forwards"
        //         }
        //     );
            

        //     // image.style.objectPosition = `${nextPercentage}% 50%`;
        // }
        // }

        const track = document.getElementById("image-track");

        window.onmousedown = e => {
            track.dataset.mouseDownAt = e.clientX;
        };

        window.onmouseup = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        };

        window.onmousemove = e => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

            // Ensure nextPercentage is between 0 and -100
            const clampedPercentage = Math.max(-100, Math.min(0, nextPercentage));

            track.dataset.percentage = clampedPercentage;

            // Apply the animation with the clamped percentage
            track.animate(
                [
                    { transform: `translate(${track.dataset.percentage || 0}%, -25%)` }, // Starting point
                    { transform: `translate(${clampedPercentage}%, -25%)` } // End point
                ],
                {
                    duration: 1200,
                    fill: "forwards"
                }
            );

            for (const image of track.getElementsByTagName("img")) {
                // image.animate(
                //     [
                //         { objectPosition: `${track.dataset.percentage || 0}% 50%` }, // Starting position
                //         { objectPosition: `${clampedPercentage}% 50%` } // End position
                //     ],
                //     {
                //         duration: 1200,
                //         fill: "forwards"
                //     }
                // );
                image.style.objectPosition = `${nextPercentage+ 100}% 50%`;
            }
        };

        });
    })
    .catch(error => {
        console.error('Error fetching the products:', error);
    });



