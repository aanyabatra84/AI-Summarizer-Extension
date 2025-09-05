function getArticleText(){
    console.log('getArticleText function called');
    const article = document.querySelector("article");
    if (article){
    console.log('Found <article> element');
        return article.innerText;
    }
    else{
    console.log('No <article> element, using <p> tags');
        const paragraphs = Array.from(document.querySelectorAll("p"));
        return paragraphs.map((p) => p.innerText).join("\n");
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if ((request.type === "GET_ARTICLE_TEXT")){
    console.log('Sending article text');
        const text = getArticleText();
        sendResponse({text});
    }
})