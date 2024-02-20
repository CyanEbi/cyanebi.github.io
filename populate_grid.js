for (let i=1; i<= 10; i++) {
    createItem(i);
}

function createItem(text) {
    const item = document.createElement("div");
    item.appendChild(document.createTextNode(text));
    document.getElementById("item_grid").appendChild(item);
}

//fetch("https://filedn.eu/lICGQ70GyArLkezuN1LifrS/Condensed%20Audio/Item%20data/A%20Letter%20to%20Momo.json")
//    .then(response => response.json())
//    .then(data => createItem(data.english));