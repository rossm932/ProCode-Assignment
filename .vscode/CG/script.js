//// *Fetch CATAAS API to go here
/////
/////
/////

/////Waits till the page is fully loaded before the code inside function can run
//prevents any attempt to access DOM elements that might not yet be available.
document.addEventListener('DOMContentLoaded', function () {
    const loadMoreButton = document.getElementById('load-more-cats'); 
    const catGallery = document.getElementById('cat-gallery');
    const errorMessage = document.getElementById('error-message');
    const apiUrl = 'https://cataas.com/api/cats?limit=10'; ///* Used to fetch 10 cat images per click. The response in JSON, and each image is appended to the gallery.

    async function fetchCatImages() {
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
            const li = document.createElement('li');
            const img = document.createElement('img');
            // Add a timestamp to the image URL to ensure uniqueness
            img.src = 'https://cataas.com/cat';
            img.alt = 'Random Cat';
            li.appendChild(img);
            catGallery.appendChild(li);
        });
    }
//* Loads more cat images on click from the html button, 'loadMoreButton assigned to get element ID 'load-more-cats */
    loadMoreButton.addEventListener('click', fetchCatImages);

    // Initial fetch
    fetchCatImages();
});