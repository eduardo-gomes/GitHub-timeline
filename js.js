import { Octokit } from "https://cdn.pika.dev/@octokit/rest";
const octokit = new Octokit();

function getUser(user){
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
		value.data.map((repo) => {
			AddRepoHtmlToDiv(
				RepoObjToHtml(repo)
			)
		});
	}, function (value) {
		console.log("can't find user")
	})

	function RepoObjToHtml(repo){
		const {created_at, name} = repo;
		return(
			`<p>Repo: ${name}, Created at: ${created_at}</p>`
		);
	}

	function userToHtml(user){
		const {name, avatar_url} = user;
		return(
			`
			<h2>${name}</h2>
			<img src="${avatar_url}">
			`
		);
	}

	function AddRepoHtmlToDiv(repoHtml){
		document.getElementById('repos').innerHTML += repoHtml;
	}
	function ClearRepoDiv(repoHtml) {
		document.getElementById('repos').innerHTML = "";
	}
	function SetUserHtmlToDiv(userHtml) {
		document.getElementById('user').innerHTML = userHtml;
	}
}

function OnButtonClick(){

	const username = document.getElementById('username').value;
	const user = { 'username': username };
	getUser(user);
}
getUser({ 'username': 'eduardo-gomes' });
document.querySelector('button').addEventListener('click', OnButtonClick);
