const buyButton = document.getElementById("buyButton")
const deleteFromCart = document.getElementsByClassName("deleteFromCart")
const cId = document.getElementById("cId").innerText

buyButton.addEventListener("click", () => {
    fetch("/api/payments/payment-intents",{
        method: "POST"
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "success") {
            window.location.href = data.payload.url
        } else {
            alert("No hay stock de al menos uno de los productos")
        }
    })
})


for (let i=0; i<deleteFromCart.length; i++) {
    deleteFromCart[i].addEventListener("click", () => {
        const pId = deleteFromCart[i].getAttribute("ref")
        fetch("/api/carts/" + cId + "/products/" + pId, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "success") {
                window.location.href = ""
            } else {
                alert("Algo salio mal")
            }
        })
    })
}