function outputItems(items) {
    if (!items.data || !(items.data instanceof Array)) {
        return;
    }
    for (let item of items.data) {
		if (!item) continue;
        let parent = document.getElementById("data");
        let child = document.createElement("p");
		let html = "" + item[0] + ": " + item[1];
		if (item[2]) {
			html += ".." + item[2];
		}
        child.innerHTML = html;
        parent.appendChild(child);
    }
}

function showItems() {
    chrome.storage.local.get(
        "data",
        (result) => { outputItems(result); });
}

document.addEventListener('DOMContentLoaded', showItems);
