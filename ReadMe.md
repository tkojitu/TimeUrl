# TimeUrl

Times active URLs.

## Test

### Ver.1

- add event listeners to chrome.tabs
  - onCreated
    - logs TimeUrl.items
  - onActivated
    - does nothing
  - onRemoved
    - gets tabIds from chrome.storage.local
	  - key: "data"
	- adds tabId to tabIds
    - stores tabIds to chrome.storage.local
	  - key: "data"
  - onUpdated
    - does nothing
