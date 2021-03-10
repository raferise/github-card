const GithubAPI = {
    getUser: async function(username) {
        try {
            let resp = await fetch(`https://api.github.com/users/${username}`);
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
    },
    getSuggestions: async function(partialUsername) {
        try {
            let resp = await fetch(`https://api.github.com/search/users?q=${partialUsername}&per_page=10`);
            if (resp.ok) {
                return await resp.json();
            } else {
                throw Error(resp.status);
            }
        } catch (error) {
            console.error("Error obtaining suggestions", error);
            return ({
                items:[
                    {
                        login:"Error "+error.message
                    }
                ]
            });
        }
    },
}
export default GithubAPI;
