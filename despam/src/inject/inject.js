chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		var emailList = ['baibhavmishra2010@gamil.com', 'santripta@gamil.com', 'india@acceptu.com', 'aastha.gaur100@gmail.com', 'chrysalisdps20@gmail.com', 'aravcr4085@gmail.com'];
		function isDefaultInbox()
		{
			return true;
		}

		let defaultInbox = isDefaultInbox();

		function filterDefault()
		{
			let mailList = document.getElementsByClassName("no")[1].getElementsByTagName("tbody")[2].getElementsByTagName("tr");
			for(let a = 0; a < mailList.length; a++)
			{
				let emailId = mailList[a].getElementsByTagName('span')[7].getAttribute('email');
				if (emailList.includes(emailId))
				{
						tBodies[2].getElementsByTagName('tr')[a].style.backgroundColor = "#AB3A3A";
				}
				else
				{
						// tBodies[2].getElementsByTagName('tr')[a].style.backgroundColor = "white"
				}
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


// for(let a = 0; a < tBodies.length; a++)
// 			{
// 				let emailId = document.getElementsByClassName("no")[1]
// 				.getElementsByTagName("tbody")[2].getElementsByTagName("tr")[a]
// 				.getElementsByTagName('span')[6].getAttribute('email')


// 					if (emailList.includes(emailId))
// 					{
// 						//tBodies[2].classList.add("alt");
// 						console.log("Yeah!")

// 					}

// 				window.alert(document.getElementsByClassName("no")[1].getElementsByTagName("tbody")[2].getElementsByTagName("tr")[i].getElementsByTagName('span')[6].getAttribute('email'));
// 			}
// 		}
