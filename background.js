chrome.runtime.onInstalled.addListener(() => {
    class Duration {
        constructor(tabId) {
            this.tabId = tabId;
            this.time = 0;
            this.st = 0;
            this.ed = 0;
        }

        start() {
            this.st = Date.now();
            this.ed = 0;
        }

        end() {
            this.ed = Date.now();
            this.time += this.ed - this.st;
        }

        toArray() {
            return [this.tabId, this.time];
        }
    }

    class TimeUrl {
        constructor () {
            this.items = new Map();
            this.currId = 0;
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

        onActivated(activeInfo) {
            this.items.get(this.currId)?.end();
            this.currId = activeInfo.tabId;
            this.items.get(this.currId)?.start();
            this.save();
        }

        save() {
            let ary = [];
            for (let [tabId, dur] of this.items) {
                if (dur.ed) {
                    ary.push(dur.toArray());
                }
            }
            chrome.storage.local.set({ data: ary });
        }

        onRemoved(tabId, removeInfo) {
            this.items.delete(tabId);
        }

        onUpdated(tabId, changeInfo, tab) {}
    }

    new TimeUrl().addListeners();
});
