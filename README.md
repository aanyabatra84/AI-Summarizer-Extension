
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

1. **manifest.json**
    - **Purpose:** Provides foundational details/roadmap about the extension including the name, version (of extension and manifest json version), and permissions to access user's browser & its contents. Also directs specific procedures and program scripts to certain files.
    - **Details:**
        - **Action:** Default popup (popup.html file) on page will appear when user clicks on the extension icon (with icon.png as the image) from Chrome toolbar.
        - **Content Scripts:** Scripts executed automatically once extension is opened (content.js), permissions set to all URLs for ability to read page contents.
        - **Background:** Handles events running in background (e.g., on extension installation/ Google Chrome updates program will attempt to retrieve gemini API key from Chrome storage sync)
        - **Options Page:** Options.html page for user to enter their Google Gemini API key if they do not have one.
        - **Host Permissions:** Extension can directly access all URLs.

2. **popup.html**
    - **Purpose:** This is the initial popup window that appears on page, and displays text instructions for the user to indicate their preferred summary format (brief, detailed, bullet points). It also includes a dropdown window as well as a summary & clipboard copying button layout.
    - **Details:**
        - **Head Element:** Contains information about the popup.html page (not displayed anywhere, mainly for readability and documentation purposes)
            - Sets viewing window for popup as equivalent to the device's width in css pixels (in order for popup size to be adjusted based on device)
            - Set title of page as 'AI Summarizer'
            - Styling information in css for specified elements in the body element
        - **Body Element:** Displayed text/ UI for page
            - Heading Size 2: Prints 'AI SUMMARIZER'
            - Dropdown menu with summary type options using select and option elements. Value given for easy retrieval when accessing user's selection for 'summary-type' ID (checking if that's brief, detailed, or bullets)
            - Preformatted element: Prints instructions for the user on popup page.
            - Button Elements: Summarize webpage, Copy generated summary to clipboard.
            - Script for this file's functionality is in 'popup.js'.

3. **Background.js**
    - **Purpose:** Background program script that runs when the extension is installed or Chrome is updated.
    - **Details:**
        - Checking for value called geminiAPIKey from Chrome Sync Storage using a callback function that receives a parameter object 'result'. We then check if result.geminiAPIKey exists. If it does not exist, this means that the user does not have an API key for Gemini --> a new tab is opened on the users chrome browser with 'options.html' file.

4. **Options.html**
    - **Purpose:** Html file with further instructions for user to create an API key from the Google AI Studio website.
    - **Details:**
        - **Head Element:** Provides a layout for page containing Gemini API key creation details. 
            - Title for page (not displayed anywhere, mainly for readability and documentation purposes)
            - Contains styling information for page components.
        - **Body Element:**
            - Heading with brief page information text ('AI SUMMARY SETTINGS')
            - Label: 'Gemini API Key'
            - Input Text: For users to enter their API key ID once created.
            - Paragraph Element (<p></p>): Instructions for getting an API key from Google AI Studio with hyperlink.
        - **Button Element:** 
            - Save Button
            - Success message once API key saved in program
        - **Script Element:**
            - Functionality for 'options.html' file is in 'options.js'

5. **Options.js**
    - **Purpose:** Provides functionality for API key storage (with user input) and success message.
    - **Details:**
        - Once the 'options.html' page loads as a new tab, we add an event listener to get the geminiAPIKey from Chrome Sync Storage.
            - Pass the value for the key in a callback function, checking whether it exists. If it does, this geminiAPIKey value is placed into the input in the field with id 'api-key' (place where user would enter their new key once they create it via Google AI Studio if we had not found an existing key once the 'options.html' file loaded).
        - **Save Button:** Event listener for when clicked.
            - Gets the user inputted value for the key from the input field, saving it in a variable called apiKey.
            - If the value is null --> return nothing (e.g., User may have accidentally clicked without entering the key). Otherwise, we sync the Chrome Storage Gemini API key.
            - Close 'options.html' window with timeout function.

6. **Content.js**
    - **Purpose:** Parse and retrieve content on webpage.
    - **Details:**
        - **Function:** getArticleText
            - Query select components from the webpage with article element (<a></a>)
            - If found, function returns element's inner text with content
            - Otherwise, we trieve all paragraph html elements in an array format
            - Mapping each paragraph element's inner text and joining them by separaring with a new line in between.
        - Add listeners on Chrome tab messages: request, sender, sendResponse
            - If message request send with type "GET_ARTICLE_TEXT", we can call the getArticleText function defined above to extract webpage text and send that back to sender using sendResponse function.

7. **Popup.js**
    - **Purpose:** Handle Gemini API calls for summary. 
    - **Details:**
        - **Function:** getGeminiSummary
            - Builds a prompt based on the selected summary type.
            - Sends the prompt and article text to Gemini.
            - Returns the summary response.
        - User clicks on Summarize button on popup:
            - Script gets summary type selected by user.
            - Uses Chrome Storage to retrieve the geminiAPIKey.
            - Sends message to extract article text.
            - Calls function to get summary from Gemini.
            - Displays summary or error message if API call fails.
    - **Purpose:** Handle Gemini API calls for summary. 
    - **Details:**
        - **Function:** getGeminiSummary
            - Builds a prompt based on the selected summary type. Sends the prompt and article text to Gemini. Returns the summary response.
        - User clicks on Summarize button on popup --> script gets summary type selected by user, uses Chrome Storage to retrieve the geminiAPIKey. Sends message to extract article text. Calls function to get summary from Gemini. Displays summary or error message if API call fails.

8. **Icon.js:** Image for extension that shows up on Chrome toolbar.

