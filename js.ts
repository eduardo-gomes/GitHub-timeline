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

	ClearRepoDiv();
	if (user == undefined) {
		const user: any = userJSON;
		handleUserResponse(user);
		const repo: any = reposJSON;
		handleRepoResponse(repo);
	} else {
		const userObj = octokit.users.getByUsername(user);
		userObj.then(function (value) {
			console.log("deu certo")
			console.log(value.data);
			handleUserResponse(value.data);
		}, function (value) {
			alert("didn't recieve 200 from server")
		})

		const userRepos = octokit.repos.listForUser(user);
		userRepos.then(function (value) {
			console.log("deu certo")
			console.log(value.data);
			handleRepoResponse(value.data);
		}, function (value) {
			console.log("can't find user's repos")
		})
	}

	function handleUserResponse(user: UserObj) {
		SetUserHtmlToDiv(
			userToHtmlDiv(user)
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


	function userToHtmlDiv(user: UserObj) {
		function getBioHtml(bio: string | null) {
			if (bio != null)
				return `<main>${bio}</main>`;
			else return '';
		}

		const { name, avatar_url, login, location, bio, html_url } = user;
		return (
			`
			<div id="user">
			<img src="${avatar_url}">
			<span>
			<h2>${name}</h2>
			<p><a href="${html_url}">${login}</a></p>
			<p>${location}</p>
			</span>
			${getBioHtml(bio)}
			</div>
			`
		);
	}
}

function onSubmit(event: Event) {
	event.preventDefault();

	const usernameElement = document.getElementById('username') as HTMLInputElement
	const username = usernameElement.value;
	const user = { 'username': username };
	getUser(user);
}
//getUser({ 'username': 'eduardo-gomes' });
getUser(undefined);

const GetForm = document.getElementById('search-form') as HTMLFormElement;
GetForm.addEventListener('submit', onSubmit);


export default getUser;