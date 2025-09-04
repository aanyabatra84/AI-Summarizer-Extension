document.getElementById("summarize").addEventListener("click", ()=>{
    console.log('Summarize button clicked');
    const result = document.getElementById("result");

    const summaryType = document.getElementById("summary-type").value

    result.innerHTML = '<div class = "loader"></div>';

    chrome.storage.sync.get(["geminiAPIKey"], ({geminiAPIKey}) => {
    console.log('API Key:', geminiAPIKey);
        if (!geminiAPIKey){
            result.textContent = "No API Key is set.";
            return;
        }

        chrome.tabs.query({active: true, currentWindow:true}, ([tab]) => {
    console.log('Active tab:', tab);
        chrome.tabs.sendMessage(
            tab.id,
            {type: "GET_ARTICLE_TEXT"},
            async ({text}) => {
                console.log('Received text from content script:', text);
                if (!text){
                    result.textContent = "Could not extract text from page."
                    return;
                }
                
                try {
                    const summary = await getGeminiSummary(text, summaryType, geminiAPIKey)
                    console.log('Summary:', summary);
                    result.textContent = summary;
                } catch (error){
                    console.error('Gemini Error:', error);
                    result.textContent = "Gemini Error: " + error.message;
                }
            }
        );
    });
});


    

});

async function getGeminiSummary(text, summaryType, geminiAPIKey){
    let prompt = "";
    if (summaryType === "brief"){
        prompt = "Briefly summarize the following text in 4-5 sentences: "  + text;
    }
    else if (summaryType === "detailed"){
        prompt = "Provide a detailed summary of the following text: " + text;
    }
    else if (summaryType === "bullets"){
        prompt = "Summarize the following text into bullet points: " + text;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiAPIKey}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [{parts: [{text: prompt}]}],
            generationConfig: {temperature: 0.2},
        })
    })

    if (!response.ok){
        const {error} = await response.json();
        throw new Error(error?.message || "Request Failed.")
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No Summary";
};
