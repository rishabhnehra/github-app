import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Grid, Cell, Row } from '@material/react-layout-grid'
import List, { ListItemText, ListItem } from '@material/react-list'
import Switch from '@material/react-switch';
import {ChipSet, Chip} from '@material/react-chips'

import '@material/react-list/dist/list.css';
import '@material/react-layout-grid/dist/layout-grid.css';
import "@material/react-switch/dist/switch.css";
import "@material/react-chips/dist/chips.css";

const BarGraph = ({ issues }) => {

    let openIssues = 0
    let closedIssues = 0

    if (issues !== null) {
        for (let i of issues)
            if (i.state === "open")
                openIssues++
            else
                closedIssues++
    }

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Issues'
        },
        xAxis: {
            categories: ['Open', 'Closed'],
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: '# of issues',
            },
        },
        series: [{
            name: 'Issues',
            data: [openIssues, closedIssues]
        }]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

const PieChart = ({ issues }) => {

    let openIssues = 0
    let closedIssues = 0

    if (issues !== null) {
        for (let i of issues)
            if (i.state === "open")
                openIssues++
            else
                closedIssues++
    }

    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Issues'
        },
        xAxis: {
            categories: ['Open', 'Closed'],
            title: {
                text: null
            }
        },
        yAxis: {
            title: {
                text: '# of issues',
            },
        },
        series: [{
            name: 'Issues',
            data: [{
                name: "Open",
                y: openIssues
            },
            {
                name: "Closed",
                y: closedIssues
            }]
        }]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

class Repository extends Component {

    state = {
        repository: null,
        commits: null,
        forks: null,
        issues: null,
        showBar: true
    }

    getRespository = () => {
        const { username, repo } = this.props.match.params
        fetch(`https://api.github.com/repos/${username}/${repo}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ repository: data }))
            .catch(error => console.error(error))
    }

    getCommits = () => {
        const { username, repo } = this.props.match.params
        fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ commits: data }))
            .catch(error => console.error(error))
    }

    getForks = () => {
        const { username, repo } = this.props.match.params
        fetch(`https://api.github.com/repos/${username}/${repo}/forks`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ forks: data }))
            .catch(error => console.error(error))
    }

    getIssues = () => {
        const { username, repo } = this.props.match.params
        fetch(`https://api.github.com/repos/${username}/${repo}/issues`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({ issues: data }))
            .catch(error => console.error(error))
    }

    componentDidMount = () => {
        this.getRespository()
        this.getCommits()
        this.getIssues()
        this.getForks()

    }

    render() {
        const { repository, issues, forks, commits, showBar } = this.state
        const { username } = this.props.match.params
        return (
            <div>

                <Grid>
                    <Row>
                        <Cell columns={12}>
                            {repository ? (
                                <div>
                                    <h2>{repository.name}</h2>
                                    <p>By <Link to={`/profile/${username}`}>{repository.owner.login}</Link></p>
                                </div>
                            ) : (<progress></progress>)}
                        </Cell>
                    </Row>

                    <Row>
                        <Cell desktopColumns={3} tabletColumns={2} phoneColumns={4}>
                            <h3>Commits</h3>
                            {commits && <p>{commits.length} commits</p>}
                        </Cell>

                        <Cell desktopColumns={9} tabletColumns={6} phoneColumns={4}>
                            <List twoLine>
                                {commits && commits.map(c => (
                                    <ListItem>
                                        <ListItemText primaryText={c.commit.message}
                                            secondaryText={`Commiter: ${c.commit.committer.name}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Cell>
                    </Row>

                    <Row>
                        <Cell desktopColumns={3} tabletColumns={2} phoneColumns={4}>
                            <h3>Forks</h3>
                            {forks && <p>{forks.length} forks</p>}
                        </Cell>

                        <Cell desktopColumns={9} tabletColumns={6} phoneColumns={4}>
                            <List>
                                {forks && forks.map(f => (
                                    <Link to={`/profile/${f.owner.login}`}>
                                        <ListItem>
                                            <ListItemText primaryText={f.owner.login} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Cell>
                    </Row>

                    <Row>
                        <Cell desktopColumns={3} tabletColumns={2} phoneColumns={4}>
                            <h3>Issues</h3>
                            <span>Pie</span>
                            <Switch
                                checked={showBar}
                                onChange={(e) => this.setState({showBar: !this.state.showBar})} />
                                <span>Bar</span>
                        </Cell>

                        <Cell desktopColumns={9} tabletColumns={6} phoneColumns={4}>
                            {showBar ? <BarGraph issues={issues} /> : <PieChart issues={issues}/>}
                        </Cell>

                        <Cell desktopColumns={12} tabletColumns={6} phoneColumns={4}>
                            <List twoLine>
                                {issues && issues.map(i => (
                                    <ListItem>
                                        <ListItemText 
                                            primaryText={i.title}
                                            secondaryText={i.state}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Cell>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Repository