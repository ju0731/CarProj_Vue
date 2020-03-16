import axios from 'axios'

class AuthService {
    login(user) {
        return axios.post('http://localhost:3000/profile', {
                id: user.id,
                password: user.password
            })
            .then(this.handleResponse)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post('http://localhost:3000/register', {
                name: user.name,
                id: user.id,
                password: user.password,
                phonenumber: user.phonenumber
            })
            .then(function(response) {
                console.log(response.data);
                console.log("submit");
            })

    }

    handleResponse(response) {
        if (response.status === 401) {
            this.logout()
            location.reload(true)

            const error = response.data && response.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(response)
    }
}

export default new AuthService()