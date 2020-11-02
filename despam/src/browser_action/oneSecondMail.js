let currentInterval = undefined;
let knownIDs = [];

function createEmailElementAndAppendToDocument(res)
{
  let subject = document.createElement("div");
  let sender = document.createElement("div");
  subject.classList.add("subject");
  subject.innerText = res.subject;
  sender.classList.add("sender");
  sender.innerText = res.from;
  let info = document.createElement("div");
  info.classList.add("info");
  info.appendChild(subject);
  info.appendChild(sender);
  let body = document.createElement("div");
  body.classList.add("body");
  body.innerHTML = res.htmlBody;
  let messageCont = document.createElement("div");
  messageCont.classList.add("email-message");
  messageCont.appendChild(info);
  messageCont.appendChild(body);
  document.getElementById("inbox").appendChild(messageCont);
}

function displayEmail(id, username)
{
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState == 4 && request.status == 200)
    {
      let res = JSON.parse(request.response);
      createEmailElementAndAppendToDocument(res);
    }
    else if(request.status > 500)
    {
      request.send();
    }
  }

  request.open("GET", `https://www.1secmail.com/api/v1/?action=readMessage&login=${username}&domain=1secmail.com&id=${id}`, true);
  request.send();
}

function getMailList(username)
{
  console.log("getting mail");
  let request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if(request.readyState == 4 && request.status == 200)
    {
      let res = JSON.parse(request.response);
      for(let i = 0; i < res.length; i++)
      {
        let id = res[i].id;
        if(!knownIDs.includes(id) )
        {
          displayEmail(id, username);
          knownIDs.push(id);
        }
      }
    }
    else if(request.status > 500)
    {
      request.send();
    }
  }

  request.open("GET", `https://www.1secmail.com/api/v1/?action=getMessages&login=${username}&domain=1secmail.com`, true);
  request.send();
}

function generateEmail()
{
  let username = "";

  document.getElementById("inbox").innerHTML = "";

  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if(req.readyState == 4 && req.status == 200)
    {
      let response = JSON.parse(req.response).results[0].name;
      username = `${response.first}.${response.last}`;
      document.getElementById("temp-email").innerHTML = `${username}@1secmail.com`;
      chrome.storage.sync.set({ username: username }, () => { });
      getMailList();

      if(currentInterval !== undefined) clearInterval(currentInterval);
      currentInterval = setInterval(() => {getMailList(username)}, 2000);
    }
    else if(req.status > 500)
    {
      req.send();
    }
  }

  req.open("GET", "https://randomuser.me/api/?format=json", true);
  req.send();
}

function loadExistingEmail()
{
  let username = "";

  chrome.storage.sync.get(null, (s) => {
    console.log(s);
    let un = s.username;
    console.log(un);
    if(un !== undefined) username = un; else chrome.storage.sync.set({username: ""}, () => {});
    
    if (username !== "") {
      document.getElementById("temp-email").innerHTML = `${username}@1secmail.com`;
      document.getElementById("inbox").style.display = "block";
      getMailList();
      currentInterval = setInterval(() => { getMailList(username) }, 2000);
    }
  });
}

// fetch('https://www.1secmail.com/api/v1/?action=readMessage&login=demo&domain=1secmail.com&id=91692939', {mode: 'cors'})
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(text) {
//     console.log('Request successful', text);
//     document.getElementById("test").innerHTML = text;
//   })
//   .catch(function(error) {
//     log('Request failed', error)
//   });