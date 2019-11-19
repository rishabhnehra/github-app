import React, { Component } from 'react'

class Profile extends Component {

    state = {
        user: {},
        repos: []
    }

    getProfile = () => {
        const { username } = this.props.match.params
        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ user: data }))
            .catch(error => console.log(error)) //TODO Snackbar
    }

    getRepositories = () => {
        const { username } = this.props.match.params
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ repos: data }))
            .catch(error => console.log(error)) //TODO Snackbar
    }

    componentDidMount = () => {
        this.getProfile()
        this.getRepositories()
    }

    render() {
        const { user } = this.state
        return (
            <div>
                <h3>{user.name}</h3>
                <p>Bio: {user.bio}</p>
                <p>Location: {user.location}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Public Repos: {user.public_repos}</p>
            </div>
        )
    }
}

export default Profile