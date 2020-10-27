<<<<<<< HEAD
// let changeColor = document.getElementById('changeColor');
//   ...
//   changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
//   };
document.querySelector("input[name=toggleButton]").addEventListener("change", modechange);
function modechange (){
  console.log('clicked');
}
=======
let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
>>>>>>> 38a236dbf52d36f5778410780794a361552348f9
