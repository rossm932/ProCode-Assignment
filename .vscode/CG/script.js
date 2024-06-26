//// *Fetch CATAAS API to go here *////


//Waits till the page is fully loaded before the code inside function can run
//prevents any attempt to access DOM elements that might not yet be available.
document.addEventListener('DOMContentLoaded', function () { 
    const loadMoreButton = document.getElementById('load-more-cats'); //These lines select and store references to DOM elements that will be used later,
    const catGallery = document.getElementById('cat-gallery');        //refrences the html elements where they are displayed
    const errorMessage = document.getElementById('error-message');
    const apiUrl = 'https://cataas.com/api/cats?limit=10'; // Used to fetch 10 cat images per click. The response in JSON, and each image is appended to the gallery.

    
    async function fetchCatImages() { //This line defines an asynchronous function named fetchCatImages that will be used to fetch cat images from the API.
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('API Response:', data); // Debugging information
            if (!Array.isArray(data)) {
                throw new Error('Unexpected API response structure');
            }
            displayCatImages(data);
        } catch (error) {
            errorMessage.textContent = `Failed to fetch: ${error.message}`;
        }
    }

    //Displays the cat images in a list
    function displayCatImages(images) {
        images.forEach(image => {
            console.log('Image Data:', image); // Log the image data
            const li = document.createElement('li');
            const img = document.createElement('img');
            let imageUrl;

            // Use the _id field to construct the image URL
            if (image._id) {
                imageUrl = `https://cataas.com/cat/${image._id}`;
            } else {
                console.error('No valid image ID found in image data:', image);
                errorMessage.textContent = `No valid image ID found for some images.`;
                return;
            }
            // Create a new img element and set its src attribute to the cat image URL
            img.src = imageUrl;
            img.alt = 'A cute cat';
            img.onerror = () => { //Error handling for image loading
                console.error(`Failed to load image: ${imageUrl}`);
                errorMessage.textContent = `Failed to load image: ${imageUrl}`;
            };
            console.log('Image URL:', imageUrl); // Log the image URL for debugging
            li.appendChild(img);
            catGallery.appendChild(li);
        });
    }
//* Loads more cat images on click from the html button, 'loadMoreButton assigned to get element ID 'load-more-cats */
    loadMoreButton.addEventListener('click', fetchCatImages);

    // Initial fetch
    fetchCatImages();
});