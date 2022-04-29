# TimeUrl

Times active URLs.

## Test

### Ver.2.1

- onCreated
  - stores tab id and start time
- onRemoved
  - saves [tabId, duration]

### Ver.2

- onCreated
  - saves tab id and start time
- onRemoved
  - saves end time
- outputItems
  - outputs tab id, start time, and end time

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
