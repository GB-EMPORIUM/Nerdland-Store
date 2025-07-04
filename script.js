function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("show");
}

function showCategory(category) {
    document.getElementById("welcome").style.display = "none";
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    db.ref("products/" + category).once("value", snapshot => {
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                const product = child.val();
                const productHTML = `
                    <div class="product">
                        <img src="${product.imageUrl}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>€${product.price.toFixed(2)}</p>
                        <button 
                            class="snipcart-add-item"
                            data-item-id="${child.key}"
                            data-item-name="${product.name.replace(/"/g, '&quot;')}"
                            data-item-price="${product.price}"
                            data-item-url="https://snipcart.com"
                            data-item-description="${product.description.replace(/"/g, '&quot;')}">
                            Aggiungi al carrello
                        </button>
                    </div>
                `;
                container.insertAdjacentHTML("beforeend", productHTML);
            });
        } else {
            container.innerHTML = "<p>Nessun prodotto in questa categoria.</p>";
        }
    });

    toggleMenu();
}

// Popola il menu con le categorie disponibili
db.ref("products").once("value", snapshot => {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // Svuota il menu prima
    if (snapshot.exists()) {
        snapshot.forEach(child => {
            const category = child.key;
            categoryList.innerHTML += `<li onclick="showCategory('${category}')">${category}</li>`;
        });
    } else {
        categoryList.innerHTML = "<li>Nessuna categoria disponibile</li>";
    }
});
