const GithubAPI = {
    getUser: async function(username) {
        let resp = await fetch(`https://api.github.com/users/${username}`);
        try {
            if (resp.ok) {
                return await resp.json();
            } else {
                throw Error(resp.status);
            }
        } catch (error) {
            console.error("Error obtaining user data", error);
            return ({
                name:"Error",
                login:error.message,
                bio:"Something went wrong :(",
                
            })
        }
    }
}
export default GithubAPI;