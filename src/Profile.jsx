import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

    getAllRepositories = () => {
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
        this.getAllRepositories()
    }

    render() {
        const { user, repos } = this.state
        const { username } = this.props.match.params
        return (
            <div>
                <h3>{user.name}</h3>
                <p>Bio: {user.bio}</p>
                <p>Location: {user.location}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Public Repos: {user.public_repos}</p>
                <hr />
                <h3>Repositories</h3>
                <ul>
                    {repos.map(repo => <Link to={`${username}/${repo.name}`}><li>{repo.name}</li></Link>)}
                </ul>
            </div>
        )
    }
}

export default Profile