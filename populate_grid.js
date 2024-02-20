populateGrid();

async function populateGrid() {
    const response = await fetch("item_list.json");
    const list = await response.json();

    for (const item in list) {
        await fetch(`Items/${list[item]}.json`)
            .then(response => response.json())
            .then(data => createItem(data));
    }
}

function createItem(data) {
    const item = document.createElement("div");
    item.innerHTML = `
    <img src="${data.image}">
    <h3>${data.english}</h3>
    <p>${data.romaji}</p>
    <p>${data.japanese}</p>
    <a href="${data.mal}" target="_blank">MAL</a>
    <a href="${data.anilist}" target="_blank">Anilist</a>
    `
    document.getElementById("item_grid").appendChild(item);
}