document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["geminiAPIKey"], ({geminiAPIKey}) => {
        if (geminiAPIKey){
            document.getElementById("api-key").value = geminiAPIKey;
        }
    });

    document.getElementById("save-button").addEventListener("click", () => {
        const apiKey = document.getElementById("api-key").value;

        if (!apiKey){
            return;
        }

        chrome.storage.sync.set({geminiAPIKey: apiKey}, () => {
            document.getElementById("success-message").style.display = "block";
        
            setTimeout(() => {
                window.close();
            }, 2000);
        })
    })
})