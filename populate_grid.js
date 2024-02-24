populateGrid();

async function populateGrid() {
    const response = await fetch("item_list.json"); // If I define a variable as "await [something]" does the function halt until fetch is done or have I created a race condition?
    const list = await response.json();
    
    const item_grid = document.getElementById("item_grid");
    
    // Generate all items asynchronously while maintaining sorting order
    const len = list.length;
    const item_list = Array(len);
    const promise_list = Array(len);
    for (let i = 0; i < len; i++) {
        promise_list[i] = fetch(`Items/${list[i]}.json`)
            .then(response => response.json())
            .then(data => item_list[i] = createItem(item_grid, data));
    }

    // Populate the grid when all items are generated
    await Promise.all(promise_list);
    for (let i = 0; i < len; i++) {
        item_grid.appendChild(item_list[i]);
    }
}

function createItem(item_grid, data) {
    const item = document.createElement("div");
    item.className = "item_container";
    item.innerHTML = `
    <div class="item">
        <div class="image_container" style="cursor: pointer;" onclick="getDirectDownload('${data.download}');">
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

async function getDirectDownload(link) {
    const html = await (await fetch(link)).text();
    const link_entry = html.match(/"downloadlink": "https.*zip"/)[0];
    const direct_link = link_entry.split(" ")[1];
    const clean_direct_link = direct_link.replaceAll("\"", "").replaceAll("\\", "")
    open(clean_direct_link, "_self");
}