class overlay {
	private overlayDiv: HTMLElement;
	private mainElement: HTMLElement;
	private closeButton: HTMLElement;

	public constructor() {
		var tmpOverlayDiv = document.getElementById("overlay");
		if (tmpOverlayDiv === null) {
			tmpOverlayDiv = document.createElement("div");
			tmpOverlayDiv.setAttribute("id", "overlay");
			document.body.appendChild(tmpOverlayDiv);
			tmpOverlayDiv.innerHTML = '<div><div class="loader"/></div>';
		}
		var mainElement = tmpOverlayDiv.getElementsByTagName("main").item(0);
		if (mainElement === null) {
			mainElement = document.createElement("main");
			tmpOverlayDiv.appendChild(mainElement);
		}
		var closeButton = tmpOverlayDiv.getElementsByTagName("button").item(0);
		if (closeButton === null) {
			var tmpButtonContainer = document.createElement("div");
			closeButton = document.createElement("button");
			tmpOverlayDiv.appendChild(tmpButtonContainer);
			tmpButtonContainer.appendChild(closeButton);
			closeButton.addEventListener("click", this.buttonHide);
			closeButton.innerHTML = "Close";
		}
		this.overlayDiv = tmpOverlayDiv;
		this.mainElement = mainElement;
		this.closeButton = closeButton;
	}

	public dispLoading() {
		this.overlayDiv.className = "overlay loading";
		this.mainElement.innerText = "Loading";
	}
	public hide() {
		this.overlayDiv.classList.add("hidden");
	}
	private buttonHide() {
		const overlay = document.getElementById("overlay");
		if (overlay != null) overlay.classList.add("hidden");
	}
	public dispError(error: string) {
		this.overlayDiv.className = "overlay error";
		this.mainElement.innerText = error;
	}
}

export default overlay;