function rateFromHeader(header: ResponseHeader) {
	var rateLimit = header["x-ratelimit-limit"], rateRemaining = header["x-ratelimit-remaining"], rateReset = header["x-ratelimit-reset"];
	console.log({ rateLimit, rateRemaining, rateReset })
	if (rateRemaining != undefined && rateLimit != undefined && rateReset != undefined) {
		const rateRemainingNum = Number(rateRemaining), rateLimitNum = Number(rateLimit);
		const rateResetDate = new Date(Number(rateReset) * 1000)
		if (rateRemainingNum < 2)
			alert(`Remaining API requests(each search uses 2): ${rateRemainingNum}\nThis will reset to ${rateLimitNum} at ${rateResetDate.toLocaleString()}`)
		var remainingHTMLElement = document.getElementById('remaining-requests');
		if (remainingHTMLElement == null) {//create element
			remainingHTMLElement = document.createElement('p');
			const searchDiv = document.getElementById('search') as HTMLElement;
			searchDiv.appendChild(remainingHTMLElement);
		}
		remainingHTMLElement.innerHTML = `Remaining API requests: ${rateRemainingNum}`;
	}
}

export default rateFromHeader;