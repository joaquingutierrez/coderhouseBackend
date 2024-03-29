const pagination = document.getElementById("pagination")
const productsResponseJSON = document.getElementById("productsResponseJSON")
const productsResponse = JSON.parse(productsResponseJSON.innerHTML)

fetch("/api/carts", { method: "POST" })

const paginationFunction = (paginationParams) => {
    const {hasNextPage, hasPrevPage, page, totalPages, nextPage, prevPage} = paginationParams
    pagination.innerHTML = `
        <a href="?page=${prevPage}"><button ${hasPrevPage ? "" : "disabled"}>Anterior</button></a>
        ${totalPagesFunction(totalPages, page)}
        <a href="?page=${nextPage}"><button ${hasNextPage ? "" : "disabled"}>Siguiente</button></a>
    `
}

const totalPagesFunction = (totalPages, page) => {
    let acum =""
    for (let i = 1; i<=totalPages; i++) {
        acum += `<a href="?page=${i}"><p class=${page === i ? "active" : ""}>${i}</p></a>`
    }
    return acum
}

const addProduct = document.getElementById("addProduct")
addProduct.addEventListener("click", (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const code = document.getElementById("code").value
    const price = document.getElementById("price").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    if (!title || !description || !code || !price || !stock || !category) {
        alert("faltan datos")
    } else {
        const newProduct = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail: "Sin imagen",
            status: true
        }
        fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                newProduct
            )
        })
        .then((res) => res.json())
        .then(data => {
            if (data.message === "Usuario no autorizado") {
                return alert("Usuario no autorizado")
            }
            if (data.message === "success") {
                window.location.href = "/api/products"
            } else {
                alert("El producto ya existe")
            }
        })
    }
})

paginationFunction(productsResponse)