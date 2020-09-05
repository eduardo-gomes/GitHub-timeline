/// <reference path="../import.d.ts" />
import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';
import { reposJSON, userJSON } from './demo.js';
const octokit = new Octokit();

import RepoObjToHtml from "./repoToHTML.js";
import UserObjToHtml from "./userToHTML.js";
import rateFromHeader from "./rateToHTML.js";

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
	function handleUserResponse(user: UserObj) {
		SetUserHtmlToDiv(
			UserObjToHtml(user)
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
	

	ClearRepoDiv();
	console.log('Get User: ' + user?.username)
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
				rateFromHeader(reposResponse.headers)
				handleRepoResponse(reposResponse.data);
			}, onError)
			
		}, onError)
	}
}

export default getUser;