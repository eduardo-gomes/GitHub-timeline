/// <reference path="import.d.ts" />
import { Octokit } from 'https://cdn.pika.dev/@octokit/rest';
const octokit = new Octokit();

type UserNameObj =
{'username': string }| undefined;
type RepoObj = {created_at:string, name:string, description:string, language:string, updated_at:string, license:object, stargazers_count:number};
type UserObj = {avatar_url:string, name:string, login:string, location:string, bio:string|null, html_url:string};

function getUser(user:UserNameObj){
	const ReposElement = document.getElementById('repos') as HTMLElement, UserElement = document.getElementById('user') as HTMLElement;
	function AddRepoHtmlToDiv(repoHtml:string){
		ReposElement.innerHTML += repoHtml;
	}
	function ClearRepoDiv() {
		ReposElement.innerHTML = "";
	}
	function SetUserHtmlToDiv(userHtml:string) {
		UserElement.innerHTML = userHtml;
	}
	
	ClearRepoDiv();
	const userObj = octokit.users.getByUsername(user);
	userObj.then(function(value){
		console.log("deu certo")
		console.log(value.data);
		SetUserHtmlToDiv(
			userToHtml(value.data)
		);
	}, function (value) {
		console.log("can't find user")
	})

	const userRepos = octokit.repos.listForUser(user);
	userRepos.then(function (value) {
		console.log("deu certo")
		console.log(value.data);
		value.data.map((repo: RepoObj) => {
			AddRepoHtmlToDiv(
				RepoObjToHtml(repo)
			)
		});
	}, function (value) {
		console.log("can't find user")
	})

	function RepoObjToHtml(repo: RepoObj){
		const { created_at, name, description, language, updated_at, stargazers_count } = repo;
		return(
			`
			<div>
				<header>Repo: ${name}, Created at: ${created_at}</header>
				<main>description ${description}</main>
				<footer>
					<spam>language ${language}</spam>
					<spam>stars ${stargazers_count}</spam>
					<spam>updated_at ${updated_at}</spam>
				</footer>
			</div>
			`
		);
	}

	function userToHtml(user:UserObj){
		function getBioHtml(bio: string| null){
			if (bio != null)
				return `<main>${bio}</main>`;
			else return '';
		}
		
		const { name, avatar_url, login, location, bio, html_url} = user;
		return(
			`
			<img src="${avatar_url}">
			<span>
			<h2>${name}</h2>
			<p><a href="${html_url}">${login}</a></p>
			<p>${location}</p>
			</span>
			${getBioHtml(bio)}
			`
		);
	}
}

function OnButtonClick(){

	const usernameElement = document.getElementById('username') as HTMLInputElement
	const username = usernameElement.value;
	const user = { 'username': username };
	getUser(user);
}
getUser({ 'username': 'eduardo-gomes' });

const GetButton = document.querySelector('button') as HTMLButtonElement;
GetButton.addEventListener('click', OnButtonClick);
