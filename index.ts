/// <reference path="import.d.ts" />
import getUser from "./js/getUser.js";

function onSubmit(event: Event) {
	event.preventDefault();

	const usernameElement = document.getElementById('username') as HTMLInputElement
	const username = usernameElement.value;
	const user = { 'username': username };
	getUser(user);
}

getUser(undefined);

const GetForm = document.getElementById('search-form') as HTMLFormElement;
GetForm.addEventListener('submit', onSubmit);


export default getUser;