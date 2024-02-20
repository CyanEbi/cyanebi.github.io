for (let i=1; i<= 10; i++) {
    createItem(i);
}

function createItem(text) {
    const item = document.createElement("div");
    item.appendChild(document.createTextNode(text));
    document.getElementById("item_grid").appendChild(item);
}

fetch("Items/A Letter to Momo.json")
    .then(response => response.json())
    .then(data => createItem(data.english));
