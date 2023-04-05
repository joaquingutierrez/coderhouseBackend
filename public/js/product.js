const deleteProduct = document.getElementById("deleteProduct")
const productId = document.getElementById("productId").innerText


deleteProduct.addEventListener("click", () => {
    fetch("/api/products/" + productId, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(data => {
        if (data === "Usuario no autorizado") {
            alert("Usuario no autorizado para borrar el producto")
        } else {
            alert("Borrado con exito")
            window.location.href = "/api/products"
        }
    })
})

const updateProduct = document.getElementById("updateProduct")
updateProduct.addEventListener("click", (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const code = document.getElementById("code").value
    const price = document.getElementById("price").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    const updatedProduct = {
        title: title || undefined,
        description: description || undefined,
        code: code || undefined,
        price: price || undefined,
        stock: stock || undefined,
        category: category || undefined
    }
    fetch("/api/products/" + productId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            updatedProduct
        )
    })
    .then(res => res.text())
    .then(data => {
        if (data === "Usuario no autorizado") {
            return alert("Usuario no autorizado para actualizar el producto")
        }
        return window.location.href = "/api/products/" + productId
    })
})

const addToMyCart = document.getElementById("addToMyCart")
addToMyCart.addEventListener("click", () => {
    const cartId = addToMyCart.getAttribute("refcartid")
    const productId = addToMyCart.getAttribute("refproductid")
    const rute = "/api/carts/" + cartId + "/product/" + productId
    fetch(rute, {
        method: "POST"
    })
    .then(()=> {
        alert("Producto Agregado")
    })
})