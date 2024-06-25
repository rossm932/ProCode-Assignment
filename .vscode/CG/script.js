//// *Fetch CATAAS API to go here
/////
/////
/////

document.addEventListener('DOMContentLoaded', function () {
    const loadMoreButton = document.getElementById('load-more-cats');
    const catGallery = document.getElementById('cat-gallery');
    const errorMessage = document.getElementById('error-message');
    const apiUrl = 'https://cataas.com/api/cats?limit=10'; ///* used to fetch 10 cat images per click. The response in JSON, and each image is appended to the gallery.

    async function fetchCatImages() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log the response to check for unique IDs
            if (!Array.isArray(data)) {
                throw new Error('Unexpected API response structure');
            }
            displayCatImages(data);
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    }

    //displays the cat images in a list
function displayCatImages(images) {
    images.forEach(image => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = 'https://cataas.com/cat';
        img.alt = 'Random Cat';
        li.appendChild(img);
        catGallery.appendChild(li);

    });
}
//* Loads more cat images on click from the html button, 'loadMoreButton already defined to get element ID 'load-more-cats */
    loadMoreButton.addEventListener('click', fetchCatImages);

    // Initial fetch
    fetchCatImages();
});