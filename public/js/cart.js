const buyButton = document.getElementById("buyButton")

buyButton.addEventListener("click", () => {
    const cId = buyButton.getAttribute("ref")
    const rute = cId + "/purchase"
    fetch(rute, {method:"POST"})
})