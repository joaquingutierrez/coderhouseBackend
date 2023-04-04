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

