import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Cell, Row } from '@material/react-layout-grid'
import List, { ListItem, ListItemText } from '@material/react-list';

import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-list/dist/list.css';

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
                <Grid>
                    <Row>
                        <Cell desktopColumns={4} tabletColumns={3} phoneColumns={2}>
                            <img className="avatar" src={user.avatar_url} />
                        </Cell>
                        <Cell desktopColumns={8} tabletColumns={5} phoneColumns={2}>
                            <h2>{user.name}</h2>
                            <p>Location: {user.location}</p>
                            <p>Followers: {user.followers}</p>
                            <p>Following: {user.following}</p>
                            <p>Public Repos: {user.public_repos}</p>
                        </Cell>
                    </Row>
                    <Row>
                        <h3>Repositories</h3>
                        <Cell columns={12}>
                            <List twoLine>
                                {repos && repos.map(repo => (
                                    <Link to={`${username}/${repo.name}`}>
                                        <ListItem>
                                            <ListItemText
                                                primaryText={repo.name}
                                                secondaryText={repo.language}
                                            />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Cell>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Profile