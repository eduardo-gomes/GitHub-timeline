function rateFromHeader(header: ResponseHeader) {
	function getToHtml(remaining: number, limit: number, reset: Date){
		return(`
			<p>Remaining API requests: ${remaining}</p>
			<p>it will reset to ${limit} at: ${reset.toLocaleString()}</p>
		`
		);
	}
	var rateLimit = header["x-ratelimit-limit"], rateRemaining = header["x-ratelimit-remaining"], rateReset = header["x-ratelimit-reset"];
	console.log({ rateLimit, rateRemaining, rateReset })
	if (rateRemaining != undefined && rateLimit != undefined && rateReset != undefined) {
		const rateRemainingNum = Number(rateRemaining), rateLimitNum = Number(rateLimit);
		const rateResetDate = new Date(Number(rateReset) * 1000)
		if (rateRemainingNum < 2)
			alert(`Remaining API requests(each search uses 2): ${rateRemainingNum}\nThis will reset to ${rateLimitNum} at ${rateResetDate.toLocaleString()}`)
		var remainingHTMLElement = document.getElementById('remaining-requests');
		if (remainingHTMLElement == null) {//create element
			remainingHTMLElement = document.createElement('div');
			remainingHTMLElement.id = "remaining-requests";
			const searchDiv = document.getElementById('search') as HTMLElement;
			searchDiv.appendChild(remainingHTMLElement);
			alert('remaining-requests created');
		}
		remainingHTMLElement.innerHTML = getToHtml(rateRemainingNum, rateLimitNum, rateResetDate);
	}
}

export default rateFromHeader;