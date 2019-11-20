import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const BarGraph = () => {
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
            data: [107, 31]
        }]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

const PieChart = () => {
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
                y: 30
            },
            {
                name: "Closed",
                y: 5
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

                {showBar ? <BarGraph /> : <PieChart />}
                
                {repository ? (
                    <div>
                        <h2>{repository.name}</h2>
                        <p>By <Link to={`/profile/${username}`}>{repository.owner.login}</Link></p>
                    </div>
                ) : (<progress></progress>)}

                <hr />

                <h3>Commits</h3>
                {commits ? (
                    <div>
                        <p>{commits.length} commits</p>
                        {commits.map(c => (
                            <li>{c.commit.message}</li>
                        ))}
                    </div>
                ) : (<progress></progress>)}

                <hr />

                <h3>Forks</h3>
                {forks ? (
                    <div>
                        <p>{forks.length} forks</p>
                        {forks.map(f => (
                            <li>{f.owner.login}</li>
                        ))}
                    </div>
                ) : (<progress></progress>)}

                <hr />

                <h3>Issues</h3>
                {issues ? (
                    <div>
                        <p>{issues.length} Issues</p>
                        {issues.map(i => (
                            <li>{i.title} {i.state}</li>
                        ))}
                    </div>
                ) : (<progress></progress>)}
            </div>
        )
    }
}

export default Repository