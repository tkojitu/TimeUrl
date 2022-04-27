chrome.runtime.onInstalled.addListener(() => {
    class TimeUrl {
        constructor() {
        }

        addListeners() {
			chrome.tabs.onCreated.addListener((tab) => { this.onCreated(tab); });
			chrome.tabs.onActivated.addListener((activeInfo) => { this.onActivated(activeInfo); });
			chrome.tabs.onRemoved.addListener((tabId, removeInfo) => { this.onRemoved(tabId, removeInfo); });
			chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { this.onUpdated(tabId, changeInfo, tab); });
		}

        onCreated(tab) {
            chrome.storage.local.get(
                "data",
                (items) => { console.log(items); });
        }

        onActivated(activeInfo) {}

        onRemoved(tabId, removeInfo) {
            new Promise((resolve, reject) => {
                chrome.storage.local.get(
                    "data",
                    (items) => {
                        if (chrome.runtime.lastError) {
                            console.log(chrome.runtime.lastError);
                            return reject(chrome.runtime.lastError);
                        }
                        resolve(items);
                    });
            })
            .then((result) => {
                let items = result.data;
                if (!(items instanceof Array)) {
                    items = [];
                }
                items.push(tabId);
                chrome.storage.local.set({ data: items });
            });
        }

        onUpdated(tabId, changeInfo, tab) {}
    }

    new TimeUrl().addListeners();
});
