/// <reference path="import.d.ts" />
import { Octokit } from 'https://cdn.pika.dev/@octokit/rest';
import { reposJSON, userJSON } from './demo.js';
const octokit = new Octokit();

function RepoObjToHtml(repo: RepoObj) {
	function genHeader(name: string, url: string, created_at: string) {
		const data = new Date(created_at);
		const isFork = repo.fork ? "<span>is a fork</span>" : "";
		return (`
			<header>
				<p class="repo-name"><a href="${html_url}">${name}</a>${isFork}</p>
				<p class="repo-creation">Created: ${data.toDateString()}</p>
			</header>
		`);
	}
	function genDescription(desc: string | null) {
		if (desc != null)
			return `<main>${desc}</main>`;
		else return '';
	}
	function genFooter(updated_at: string, language: string, stargazers_count: number) {
		const languageHTML = language != null ? `<spam>language ${language}</spam>` : '';
		return (
			`<footer>
				${languageHTML}
				<spam>stars ${stargazers_count}</spam>
				<spam>last update: ${new Date(updated_at).toDateString()}</spam>
			</footer>`
		);
	}

	const { created_at, name, description, language, updated_at, stargazers_count, html_url } = repo;
	return (
		`
		<div>
			${genHeader(name, html_url, created_at)}
			${genDescription(description)}
			${genFooter(updated_at, language, stargazers_count)}
		</div>
		`
	);
}
function userObjToHtml(user: UserObj) {
	function genBioHtml(bio: string | null) {
		if (bio != null)
			return `<main>${bio}</main>`;
		else return '';
	}
	function genInfoSpan(name: string | null, html_url: string, login: string, location: string | null) {
		const nameIfNotLogin = name != null ? name : login;
		const locationHtml = location != null ? `<p>${location}</p>` : '';
		return (
			`<span>
			<h2>${nameIfNotLogin}</h2>
			<p><a href="${html_url}">${login}</a></p>
			${locationHtml}
			</span>`
		);
	}

	const { name, avatar_url, login, location, bio, html_url } = user;
	return (
		`
		<div id="user">
		<img src="${avatar_url}">
		${genInfoSpan(name, html_url, login, location)}
		${genBioHtml(bio)}
		</div>
		`
	);
}

function getUser(user: UserNameObj) {
	const ReposElement = document.getElementById('repos') as HTMLElement, UserContainerElement = document.getElementById('user-container') as HTMLElement;
	function AddRepoHtmlToDiv(repoHtml: string) {
		ReposElement.innerHTML += repoHtml;
	}
	function ClearRepoDiv() {
		ReposElement.innerHTML = "";
	}
	function SetUserHtmlToDiv(userHtml: string) {
		UserContainerElement.innerHTML = userHtml;
	}
	function compareRepoDate(a: RepoObj, b: RepoObj) {
		const DateA = new Date(a.created_at);
		const DateB = new Date(b.created_at);
		return DateB.getTime() - DateA.getTime();
	}
	function onError(value: any) {
		console.log(value);
		console.log("didn't recieve 200 from server");
		alert("didn't recieve 200 from server");
	}

	ClearRepoDiv();
	if (user == undefined) {
		const user: any = userJSON;
		handleUserResponse(user);
		const repo: any = reposJSON;
		handleRepoResponse(repo);
	} else {
		//TODO track remaining API requests
		const userObj = octokit.users.getByUsername(user);
		userObj.then(function (userResponse) {
			console.log(userResponse.data);
			handleUserResponse(userResponse.data);
			const userRepos = octokit.repos.listForUser(user);
			userRepos.then(function (reposResponse) {
				console.log(reposResponse.data);
				handleRepoResponse(reposResponse.data);
			}, onError)
		}, onError)
	}

	function handleUserResponse(user: UserObj) {
		SetUserHtmlToDiv(
			userObjToHtml(user)
		);
	}
	function handleRepoResponse(RepoArray: Array<RepoObj>) {
		RepoArray.sort(compareRepoDate);
		RepoArray.map((repo: RepoObj) => {
			AddRepoHtmlToDiv(
				RepoObjToHtml(repo)
			)
		});
	}
}

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