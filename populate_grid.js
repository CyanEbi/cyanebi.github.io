populateGrid();

async function populateGrid() {
    const response = await fetch("item_list.json");
    const list = await response.json();
    
    const item_grid = document.getElementById("item_grid");

    for (const item in list) {
        await fetch(`Items/${list[item]}.json`)
            .then(response => response.json())
            .then(data => addItem(item_grid, data));
    }
}

function addItem(item_grid, data) {
    const item = document.createElement("div");
    item.className = "item_container";
    item.innerHTML = `
    <div class="item">
        <img src="${data.image}" height=350px>
        <h3>${data.english}</h3>
        <p>${data.romaji}</p>
        <p>${data.japanese}</p>
        <a href="${data.mal}" target="_blank">MAL</a>
        <a href="${data.anilist}" target="_blank">Anilist</a>
    </div>
    `
    item_grid.appendChild(item);
}