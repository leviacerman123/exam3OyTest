let getuserv = async () => {
    try {
        let javob = await fetch("https://fakestoreapi.com/products");
        let javoblari = await javob.json();
        let products = javoblari;

        let productFather = document.querySelector(".product-container");
        let sortSelect = document.querySelector(".price-sort");
        let searchInput = document.querySelector(".search");
        let totalSpan = document.getElementById("total");
        let categoryTanlash = document.querySelector(".category-sort");
        let total = 0;

        function productRender(productCard) {
            productFather.innerHTML = "";

            productCard.forEach(product => {
                let productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <img src="${product.image}" width="100" />
                    <h3>${product.title}</h3>
                    <p>${product.price} $</p>
                    <button class="btn">Купить</button>
                `;


                productDiv.querySelector(".btn").addEventListener("click", () => {
                    total += product.price;
                    totalSpan.textContent = total.toFixed(2);
                });

                productFather.appendChild(productDiv);
            });
        }


        productRender(products);


        searchInput.addEventListener("input", () => {
            const inputValue = searchInput.value.toLowerCase();
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(inputValue)
            );
            productRender(filtered);
        });


        sortSelect.addEventListener("change", () => {
            let sortedProducts = [...products];

            if (sortSelect.value === "asc") {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortSelect.value === "desc") {
                sortedProducts.sort((a, b) => b.price - a.price);
            }

            productRender(sortedProducts);
        });

        
        categoryTanlash.addEventListener("change", () => {
            const selectedCategory = categoryTanlash.value;

            let filtered = products;

            if (selectedCategory !== "all") {
                filtered = products.filter(product => product.category === selectedCategory);
            }

            productRender(filtered);
        });

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    } finally {
        console.log("ishladi");
    }
};

getuserv();



const checkbox = document.getElementById("checkboxInput");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark", checkbox.checked);
});

