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
			let tBodies = document.getElementsByClassName("no")[1].getElementsByTagName("tbody");
			console.log(tBodies);
			for(let a = 1; a < tBodies.length; a++)
			{
				tBodies[a].classList.add("alt");
			}
		}

		if(defaultInbox)
		{
			let buttons = document.getElementsByClassName("no")[1].getElementsByTagName("tbody")[0].querySelectorAll("tr>td>div")

			for(let i = 0; i < buttons.length; i++)
			{
				buttons[i].addEventListener("click", (target) => {
					setTimeout(filterDefault, 150);
				});
			}

			filterDefault();
		}
		else
		{

		}
	}
	}, 10);
});