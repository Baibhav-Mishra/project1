document.addEventListener("DOMContentLoaded", () => {
  let list = document.getElementById("list");
  let whiteListButton = document.getElementsByName("whitelist")[0];
  let blackListButton = document.getElementsByName("whitelist")[1];
  let hideButton = document.getElementsByName("hide")[0];
  let highlightButton = document.getElementsByName("hide")[1];

  let emailList = []
  let whiteList = false;
  let hide = false;

  function removeEmailElementAndCommit(email, el)
  {
    list.removeChild(el);
    let i = emailList.indexOf(email);
    emailList.splice(i,1);
    chrome.storage.sync.set({ email_list: emailList }, () => { });
  }

  function appendEmailElement(email)
  {
    let emailEl = document.createElement("div");
    emailEl.classList.add("email");
    emailEl.innerText = email;
    list.appendChild(emailEl);
    emailEl.addEventListener("click", () => {
      removeEmailElementAndCommit(email, emailEl);
      if (emailList.length === 0) document.getElementById("list").style.display = "none";
    });
  }
  
  loadExistingEmail();

  //Load settings from storage
  chrome.storage.sync.get(null, (s) => {
    let email_list = s.email_list;
    if(email_list !== undefined) emailList = email_list; else chrome.storage.sync.set({email_list: []}, () => {}); 

    if(emailList.length == 0) document.getElementById("list").style.display = "none";

    let w = s.whitelisted;
    if(w !== undefined) whiteList = w; else chrome.storage.sync.set({whitelisted: false}, () => {});

    if(w) whiteListButton.setAttribute("checked", "true"); else blackListButton.setAttribute("checked", "true");

    let h = s.hide;
    if(h !== undefined) hide = h; else chrome.storage.sync.set({hide: false}, () => {});

    if(h) hideButton.setAttribute("checked", "true"); else highlightButton.setAttribute("checked", "true");

    for(let i = 0; i < emailList.length; i++)
    {
      appendEmailElement(emailList[i]);
    }
  });

  //Attach event listeners
  document.getElementById("new-email").addEventListener("click", () => {
    console.log("add email");
    document.getElementById("list").style.display = "block";
    let emailInput = document.createElement("input");
    emailInput.classList.add("email-input");
    list.appendChild(emailInput);
    emailInput.focus();

    emailInput.addEventListener("blur", () => {
      let email = emailInput.value;
      if(email.trim() !== "")
      {
        appendEmailElement(email);
        emailList.push(email);
        chrome.storage.sync.set({email_list: emailList}, () => {});
      }
      list.removeChild(emailInput);
    });

    emailInput.addEventListener("keydown", (e) => {
      if(e.key !== "Enter") return;
      emailInput.blur();
    });
  });

  document.getElementById("create-temp-email").addEventListener("click", generateEmail)

  whiteListButton.addEventListener("click", () => {
    chrome.storage.sync.set({ whitelisted: true }, () => { })
  });

  blackListButton.addEventListener("click", () => {
    chrome.storage.sync.set({ whitelisted: false }, () => { })
  });

  hideButton.addEventListener("click", () => {
    chrome.storage.sync.set({ hide: true }, () => { })
  });

  highlightButton.addEventListener("click", () => {
    chrome.storage.sync.set({ hide: false }, () => { })
  });
});