import React, { Component } from 'react'
import Card, {
    CardPrimaryContent,
    CardMedia
} from '@material/react-card'
import TextField, { HelperText, Input } from '@material/react-text-field';
import Button from '@material/react-button'
import { Grid, Row, Cell } from '@material/react-layout-grid'
import { Link } from 'react-router-dom'

import '@material/react-card/dist/card.css';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-button/dist/button.css';
import '@material/react-layout-grid/dist/layout-grid.css';

const SearchItem = ({ item }) => {
    return (
        <Card className='searchitem__container'>
            <CardPrimaryContent>
                <CardMedia square imageUrl={item.avatar_url} className="searchitem__media" />
                <div className="SearchItem__container">
                    <p>{item.login}</p>
                </div>
            </CardPrimaryContent>
        </Card>
    )
}


class Search extends Component {
    state = {
        value: '',
        searchResult: {}
    }

    submitHandler = (e) => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${this.state.value}`)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error(`Error ${response.status} : ${response.statusText}`)
            })
            .then(data => this.setState({
                searchResult: data
            }))
            .catch(error => console.log(error)) //TODO: Add Snackbar to handle error
    }

    render() {
        const { value, searchResult } = this.state
        const { items } = searchResult
        return (
            <div>
                <Grid>
                    <Row align="center">
                        <Cell columns={12}>
                            <form onSubmit={this.submitHandler}>
                                <TextField
                                    label="Enter username"
                                ><Input
                                        value={value}
                                        onChange={(e) => this.setState({ value: e.currentTarget.value })} />
                                </TextField>
                                <div>
                                    <Button className="Profile__submitbutton" raised type="submit">Search</Button>
                                </div>
                            </form>
                        </Cell>
                    </Row>
                </Grid>

                <Grid>
                    <Row>
                        {items && items.map(item => (
                            <Cell columns={3} phoneColumns={4}>
                                <Link to={`/profile/${item.login}`}>
                                    <SearchItem item={item} />
                                </Link>
                            </Cell>
                        ))}
                    </Row>
                </Grid>

            </div>
        );
    }
}

export default Search