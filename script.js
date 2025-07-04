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

                // CREA IL CONTENITORE DEL PRODOTTO
                const productDiv = document.createElement("div");
                productDiv.className = "product";

                // Immagine
                const img = document.createElement("img");
                img.src = product.imageUrl;
                img.alt = product.name;

                // Nome prodotto
                const title = document.createElement("h3");
                title.textContent = product.name;

                // Descrizione
                const desc = document.createElement("p");
                desc.textContent = product.description;

                // Prezzo
                const price = document.createElement("p");
                price.textContent = `€${product.price.toFixed(2)}`;

                // Bottone Snipcart
                const button = document.createElement("button");
                button.className = "snipcart-add-item";
                button.textContent = "Aggiungi al carrello";
                button.setAttribute("data-item-id", child.key);
                button.setAttribute("data-item-name", product.name);
                button.setAttribute("data-item-price", product.price);
                button.setAttribute("data-item-url", "https://snipcart.com"); // URL finto valido
                button.setAttribute("data-item-description", product.description);

                // Aggiungi tutto al contenitore
                productDiv.appendChild(img);
                productDiv.appendChild(title);
                productDiv.appendChild(desc);
                productDiv.appendChild(price);
                productDiv.appendChild(button);

                // Inserisci nel container
                container.appendChild(productDiv);
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
            const li = document.createElement("li");
            li.textContent = category;
            li.onclick = function () {
                showCategory(category);
            };
            categoryList.appendChild(li);
        });
    } else {
        categoryList.innerHTML = "<li>Nessuna categoria disponibile</li>";
    }
});
