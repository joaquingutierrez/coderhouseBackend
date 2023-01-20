var socket = io();

const stringHTMLProducts = (products) => {
    let productsRenderList = ""
    products.map(item => {
        productsRenderList += `
        <li>
            <h3>title: ${item.title}</h3>
            <p>description: ${item.description}</p>
            <h3>price: ${item.price}</h3>
            <h4>code: ${item.code}</h4>
        </li>
    `
    })
    return productsRenderList
}
const productsRender = document.getElementById("productsRender")
socket.on("emitPOST", async (data) => {
    productsRender.innerHTML = await stringHTMLProducts(data)
})
socket.on("emitDELETE", async (data) => {
    productsRender.innerHTML = await stringHTMLProducts(data)
})