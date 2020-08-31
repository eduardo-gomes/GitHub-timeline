declare module "https://cdn.pika.dev/@octokit/rest" {
	export * from '@octokit/rest';
}

type UserNameObj = { 'username': string } | undefined;
type RepoObj = { created_at: string, name: string, description: string, language: string, updated_at: string, license: object, stargazers_count: number, html_url: string, fork: boolean };
type UserObj = { avatar_url: string, name: string | null, login: string, location: string | null, bio: string | null, html_url: string, public_repos: number };
