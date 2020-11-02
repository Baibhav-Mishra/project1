fetch('https://www.1secmail.com/api/v1/?action=readMessage&login=demo&domain=1secmail.com&id=91692939', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log('Request successful', text);
    document.getElementById("test").innerHTML = text;
  })
  .catch(function(error) {
    log('Request failed', error)
  });
