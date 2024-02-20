populateGrid();

async function populateGrid() {
    const response = await fetch("item_list.json");
    const list = await response.json();

    for (const item in list) {
        fetch(`Items/${list[item]}.json`)
            .then(response => response.json())
            .then(data => createItem(data));
    }
}

function createItem(data) {
    const item = document.createElement("div");
    item.appendChild(document.createTextNode(data.english));
    item.appendChild(document.createTextNode(data.romaji));
    item.appendChild(document.createTextNode(data.japanese));
    document.getElementById("item_grid").appendChild(item);
}