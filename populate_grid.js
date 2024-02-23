populateGrid();

async function populateGrid() {
    const response = await fetch("item_list.json");
    const list = await response.json();
    
    const item_grid = document.getElementById("item_grid");
    
    const len = list.length;
    const item_list = Array(len);
    const promise_list = Array(len);
    for (let i = 0; i < len; i++) {
        promise_list[i] = fetch(`Items/${list[i]}.json`)
            .then(response => response.json())
            .then(data => item_list[i] = createItem(item_grid, data));
    }

    
    await Promise.all(promise_list);
    console.log(item_list);

    for (let i = 0; i < len; i++) {
        console.log(item_list[i]);
        item_grid.appendChild(item_list[i]);
    }
}

function createItem(item_grid, data) {
    const item = document.createElement("div");
    item.className = "item_container";
    item.innerHTML = `
    <div class="item">
        <div class="image_container" style="cursor: pointer;" onclick='window.location="${data.download}";'>
            <img src="${data.image}">
        </div>
        <h3>${data.english}</h3>
        <p>${data.romaji}</p>
        <p>${data.japanese}</p>
        <div>
            <a href="${data.mal}" target="_blank">MAL</a>
            <a href="${data.anilist}" target="_blank">Anilist</a>
        </div>
    </div>
    `
    return item;
}