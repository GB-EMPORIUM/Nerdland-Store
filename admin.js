const form = document.getElementById("productForm");
const status = document.getElementById("status");

form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value.toLowerCase();
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const imageUrl = document.getElementById("imageUrl").value;

    const newProductRef = db.ref("products/" + category).push();
    newProductRef.set({
        name,
        price,
        description,
        imageUrl
    }).then(() => {
        status.innerText = "✅ Prodotto aggiunto!";
        form.reset();
    }).catch((error) => {
        status.innerText = "❌ Errore: " + error.message;
    });
});
