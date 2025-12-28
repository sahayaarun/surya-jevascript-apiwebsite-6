document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById("productContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const errorAlert = document.getElementById("errorAlert");
    const api_url = "https://fakestoreapi.com/products";

    // main function
    async function fetchProducts() {
        loadingSpinner.classList.remove('d-none');
        errorAlert.classList.add('d-none');

        try {
            const res = await fetch(api_url);
            if (!res.ok) {
                throw new Error("API Fetching error");
            }
            const products = await res.json();
            displayProducts(products);
        } catch (err) {
            errorAlert.classList.remove('d-none');
        } finally {
            errorAlert.classList.add('d-none');
        }
    }

    function displayProducts(products) {

        let productsHTML = '';

        products.forEach(data => {
            productsHTML += `
            <div class="col">
            <div class="card shadow-sm h-100">
            <img src="${data.image}" class="card-img-top" />
            <div class="card-body d-flex flex-column justify-content-between align-items-center">
            <h5 class="card-title fw-bold mb-3" style="max-height: 4em; overflow: hidden">${data.title}</h5>
            <p class="card-text mb-3 text-muted small" style="max-height: 4.5em; overflow: hidden;">${data.description}</p>
            <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="fs-4 fw-bold text-primary">${data.price}</div>
            <small><span class="text-warning">${data.rating.rate}</span></small>
            </div>
            <div class="d-grid gap-2">
            <button class="btn btn-outline-secondary">Add to cart</button>
            <button class="btn btn-primary">Buy now</button>
            </div>
            </div>
            </div>
            </div>
            `
        });

        productContainer.innerHTML = productsHTML;

    }

    fetchProducts();
});