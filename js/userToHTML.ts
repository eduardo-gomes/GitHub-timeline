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

export default userObjToHtml;