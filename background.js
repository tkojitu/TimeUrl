chrome.runtime.onInstalled.addListener(() => {
    class Duration {
        constructor(tabId) {
            this.tabId = tabId;
            this.st = Date.now();
        }

        toArray() {
            return [this.tabId, Date.now() - this.st];
        }
    }

    class TimeUrl {
        constructor () {
            this.items = new Map();
            this.closed = [];
        }

        addListeners() {
			chrome.tabs.onCreated.addListener((tab) => { this.onCreated(tab); });
			chrome.tabs.onActivated.addListener((activeInfo) => { this.onActivated(activeInfo); });
			chrome.tabs.onRemoved.addListener((tabId, removeInfo) => { this.onRemoved(tabId, removeInfo); });
			chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { this.onUpdated(tabId, changeInfo, tab); });
		}

        onCreated(tab) {
            this.items.set(tab.id, new Duration(tab.id));
        }

        onActivated(activeInfo) {}

        onRemoved(tabId, removeInfo) {
            if (this.items.has(tabId)) {
                this.closed.push(this.items.get(tabId));
                this.items.delete(tabId);
            }
            let ary = [];
            for (let [tabId, dur] of this.items) {
                ary.push(dur.toArray());
            }
            chrome.storage.local.set({ data: ary });
        }

        onUpdated(tabId, changeInfo, tab) {}
    }

    new TimeUrl().addListeners();
});
