const pagination = document.getElementById("pagination")
const productsResponseJSON = document.getElementById("productsResponseJSON")
const productsResponse = JSON.parse(productsResponseJSON.innerHTML)


const paginationFunction = (paginationParams) => {
    const {hasNextPage, hasPrevPage, page, totalPages, nextPage, prevPage} = paginationParams
    pagination.innerHTML = `
        <a onclick="window.location='?page=${prevPage}'+window.location.search;"><button ${hasPrevPage ? "" : "disabled"}>Anterior</button></a>
        ${totalPagesFunction(totalPages, page)}
        <a onclick="window.location='?page=${nextPage}'+window.location.search;"><button ${hasNextPage ? "" : "disabled"}>Siguiente</button></a>
    `
}

const totalPagesFunction = (totalPages, page) => {
    let acum =""
    for (let i = 1; i<=totalPages; i++) {
        acum += `<p class=${page === i ? "active" : ""}>${i}</p>`
    }
    return acum
}

paginationFunction(productsResponse)