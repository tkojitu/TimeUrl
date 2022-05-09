chrome.runtime.onInstalled.addListener(() => {
    class Duration {
        constructor(url) {
            this.url = url;
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
            return [this.url, this.toTimeString(this.time)];
        }

        toTimeString(msec) {
            let sec = msec / 1000;
            let min = sec / 60;
            sec = sec % 60;
            let ss = sec.toFixed().padStart(2, '0');
            let hour = min / 60;
            min = min % 60;
            let ms = min.toFixed().padStart(2, '0');
            return hour.toFixed() + ":" + ms + ":" + ss;
        }
    }

    class TimeUrl {
        constructor () {
            this.tabIdToUrl = new Map();
            this.urlToDur = new Map();
            this.currId = 0;
        }

        addListeners() {
			chrome.tabs.onCreated.addListener((tab) => { this.onCreated(tab); });
			chrome.tabs.onActivated.addListener((activeInfo) => { this.onActivated(activeInfo); });
			chrome.tabs.onRemoved.addListener((tabId, removeInfo) => { this.onRemoved(tabId, removeInfo); });
			chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { this.onUpdated(tabId, changeInfo, tab); });
		}

        onCreated(tab) {
        }

        onActivated(activeInfo) {
            let prevId = this.currId;
            this.currId = activeInfo.tabId;
            this.getUrl(prevId)?.end();
            this.getUrl(this.currId)?.start();
            this.save();
        }

        getUrl(tabId) {
            let url = this.tabIdToUrl.get(tabId);
            return this.urlToDur.get(url);
        }

        save() {
            let ary = [];
            for (let [url, dur] of this.urlToDur) {
                if (dur.ed) {
                    ary.push(dur.toArray());
                }
            }
            chrome.storage.local.set({ data: ary });
        }

        onRemoved(tabId, removeInfo) {
        }

        onUpdated(tabId, changeInfo, tab) {
            if (!changeInfo.url) {
                return;
            }
            this.tabIdToUrl.set(tabId, changeInfo.url);
            if (!this.urlToDur.has(tabId)) {
                this.urlToDur.set(changeInfo.url, new Duration(changeInfo.url));
            }
            if (tabId == this.currId) {
                this.urlToDur.get(changeInfo.url).start();
            }
        }
    }

    new TimeUrl().addListeners();
});
