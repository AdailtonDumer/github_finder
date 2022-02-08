export function GithubApi() {
    async function Search(name = '', quantity = 30) {
        const response = await fetch(`https://api.github.com/search/users?q=${name}%20in:user&per_page=${quantity}&page=1`);
        return response.json()
    }

    async function GetUserDetails(user) {
        const { url } = user
        const userDetail = await fetch(url);
        const userData = await userDetail.json()
        const repos = await fetch(userData.repos_url)
        userData.repos = await repos.json()
        return userData
    }

    return {
        Search,
        GetUserDetails
    }
}