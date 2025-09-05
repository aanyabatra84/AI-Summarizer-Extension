
# AI Summarizer Extension

## Purpose
A Chrome extension that analyzes webpage content and summarizes it based on the user's selected summary format (brief, detailed, or bullet points).

## Technologies Used
- HTML
- JavaScript
- Google Gemini API
- Code Editor (VS Code, IntelliJ, etc.)
- GitHub (optional, for version control)

## File Overview

1. manifest.json

- Purpose: Provides foundational details/roadmap about the extension including the name, version (of extension and manifest json version), and permissions to access user's browser & its contents. Also directs specific procedures and program scripts to certain files.

- Details:
    - Action: Default popup (popup.html file) on page will appear when user clicks on the extension icon (with icon.png as the image) from Chrome toolbar.
    - Content Scripts: Scripts executed automatically once extension is opened (content.js), permissions set to all URLs for ability to read page contents.
    - Background: Handles events running in background (e.g., on extension installation/ Google Chrome updates program will attempt to retrieve gemini API key from Chrome storage sync)
    - Options Page: Options.html page for user to enter their Google Gemini API key if they do not have one.
    - Host Permissions: Extension can directly access all URLs.

2. popup.html

- Purpose: This is the initial popup window that appears on page, and displays text instructions for the user to indicate their preferred summary format (brief, detailed, bullet points). It also includes a dropdown window as well as a summary & clipboard copying button layout.

- Details
    - Head Element: Contains information about the popup.html page (not displayed anywhere, mainly for readability and documentation purposes)
        - Sets viewing window for popup as equivalent to the device's width in css pixels (in order for popup size to be adjusted based on device)
        - Set title of page as 'AI Summarizer'
        - Styling information in css for specified elements in the body element

    - Body Element: Displayed text/ UI for page
        - Heading Size 2: Prints 'AI SUMMARIZER'
        - Dropdown menu with summary type options using select and option elements. Value given for easy retrieval when accessing user's selection for 'summary-type' ID (checking if that's brief, detailed, or bullets)
        - Preformatted element: Prints instructions for the user on popup page.
        - Button Elements: Summarize webpage, Copy generated summary to clipboard.
        - Script for this file's functionality is in 'popup.js'.
    
3. Background.js

- Purpose: Background program script that runs when the extension is installed or Chrome is updated.

- Details
    - Checking for value called geminiAPIKey from Chrome Sync Storage using a callback function that receives a parameter object 'result'. We then check if result.geminiAPIKey exists. If it does not exist, this means that the user does not have an API key for Gemini --> a new tab is opened on the users chrome browser with 'options.html' file.


### `manifest.json`
Defines extension metadata, permissions, and file mappings:
    - Sets the popup (`popup.html`) and icon (`icon.png`)
    - Injects content scripts (`content.js`) on all URLs
    - Runs background logic (`background.js`)
    - Provides an options page (`options.html`) for API key entry
    - Grants host permissions for all URLs

### `popup.html`
Popup UI shown when the extension icon is clicked:
    - Dropdown to select summary type
    - Instructions and buttons for summarizing and copying
    - Loads `popup.js` for functionality

### `background.js`
Handles extension installation events:
    - Checks for Gemini API key in Chrome Sync Storage
    - Opens options page if API key is missing

### `options.html`
Settings page for entering the Gemini API key:
    - Instructions and input field for API key
    - Link to Google AI Studio for key creation
    - Save button and success message
    - Loads `options.js` for logic

### `options.js`
Manages API key storage and UI feedback:
    - Loads existing API key from Chrome Sync Storage
    - Saves new API key on button click
    - Shows success message and closes window

### `content.js`
Extracts article or paragraph text from the current webpage:
    - `getArticleText()` returns text from `<article>` or all `<p>` tags
    - Listens for messages of type `GET_ARTICLE_TEXT` and responds with extracted text

### `popup.js`
Handles Gemini API calls and summary display:
    - Builds prompt based on selected summary type
    - Sends article text and prompt to Gemini API
    - Displays summary or error message in the popup

### `icon.png`
Extension icon shown in the Chrome toolbar.