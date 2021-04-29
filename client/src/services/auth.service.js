class AuthService {
    async login(username, password){
        return fetch('http://localhost:9000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(data => data.json())
        // return axios.post("http://localhost:9000/auth/signin", {
        //     username,
        //     password
        // })
        // .then(res => {
        //     if(res.data.token) {
        //         localStorage.setItem("user", JSON.stringify(res.data));
        //         console.log("token: ", res.data.token);
        //     }
        //     return res.data;
        // }).catch(res => {
        //     console.log("Whats happening?");
        //     return null;
        // });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getUserData() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();