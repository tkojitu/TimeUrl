function outputItems(items) {
    if (!items.data || !(items.data instanceof Array)) {
        return;
    }
    for (let item of items.data) {
		if (!item) continue;
        let parent = document.getElementById("data");
        let child = document.createElement("p");
        child.innerHTML = "" + item[0] + ": " + item[1];
        parent.appendChild(child);
    }
}

function showItems() {
    chrome.storage.local.get(
        "data",
        (result) => { outputItems(result); });
}

document.addEventListener('DOMContentLoaded', showItems);
