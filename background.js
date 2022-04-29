chrome.runtime.onInstalled.addListener(() => {
    class TimeUrl {
        addListeners() {
			chrome.tabs.onCreated.addListener((tab) => { this.onCreated(tab); });
			chrome.tabs.onActivated.addListener((activeInfo) => { this.onActivated(activeInfo); });
			chrome.tabs.onRemoved.addListener((tabId, removeInfo) => { this.onRemoved(tabId, removeInfo); });
			chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { this.onUpdated(tabId, changeInfo, tab); });
		}

        onCreated(tab) {
            chrome.storage.local.get("data")
            .then((obj) => {
                let data = obj.data;
                if (!(data instanceof Array)) {
                    data = [];
                }
                data.push([tab.id, Date.now()]);
                chrome.storage.local.set({ data: data });
            });
        }

        onActivated(activeInfo) {}

        onRemoved(tabId, removeInfo) {
            chrome.storage.local.get("data")
            .then((obj) => {
                let data = obj.data;
                if (!data) {
                    return;
                }
                let item = data.find(item => item[0] == tabId);
                if (!item) {
                    return;
                }
                item.push(Date.now());
                chrome.storage.local.set({ data: data });
            });
        }

        onUpdated(tabId, changeInfo, tab) {}
    }

    new TimeUrl().addListeners();
});
