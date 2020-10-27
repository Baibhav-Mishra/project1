let emailList = [];
let whiteList = false;
let hide = false;

function getSettings()
{
	chrome.storage.sync.get(null, (s) => {
		if(s.email_list !== undefined) emailList = s.email_list;
		if(s.whitelisted !== undefined) whiteList = s.whitelisted;
		if(s.hide !== undefined) hide = s.hide;
	});
}

getSettings();

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		function isDefaultInbox()
		{
			return true;
		}

		let defaultInbox = isDefaultInbox();

		function filterDefault()
		{
			let mailList = document.getElementsByClassName("no")[1].getElementsByTagName("tbody")[2].getElementsByTagName("tr");
			let filtered = []
			for(let a = 0; a < mailList.length; a++)
			{
				let emailId = mailList[a].getElementsByTagName('span')[7].getAttribute('email');

				if ((emailList.includes(emailId) && !whiteList) || (!emailList.includes(emailId) && whiteList))
				{
					filtered.push(mailList[a]);
				}
			}

			return filtered;
		}

		function applyDefault(filtered)
		{
			for(let i = 0; i < filtered.length; i++)
			{
				if(!hide) filtered[i].style.backgroundColor = "#AB3A3A"; else filtered[i].style.display = "none";
			}
		}

		function doDefault()
		{
			getSettings();
			let filtered = filterDefault();
			applyDefault(filtered);
			return filtered;
		}

		if(defaultInbox)
		{
			let buttons = document.getElementsByClassName("no")[1].getElementsByTagName("tbody")[0].querySelectorAll("tr>td>div")

			for(let i = 0; i < buttons.length; i++)
			{
				buttons[i].addEventListener("click", (target) => {
					setTimeout(doDefault, 150);
				});
			}
			
			doDefault();
		}
		else
		{

		}
	}
	}, 10);
});