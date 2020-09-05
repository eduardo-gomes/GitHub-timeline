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

export default RepoObjToHtml;