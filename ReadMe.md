# TimeUrl

Times active URLs.

## Test

### Ver.3.1

+ toTimeString

### Ver.3

#### Usecase 2

* New tab
* Input URL
* Switch tab

#### Usecase 1

* New tab
* Input URL
* Close tab

#### Testcase

- onCreated
  - does nothing
- onActivated
  - remembers the activated tab id
  - retrieves the previous aDuration by previous tab id
  - ends aDurtion
  - saves aDurations
- onUpdated
  - binds the current tab id to URL
  - starts aDuration if tab id is for current tab
- onRemoved
  - does nothing

### Ver.2.2

- onActivated
  - ends old aDuration
  - starts new aDuration
  - saves old Durations
- onRemoved
  - removes closed aDuration

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
