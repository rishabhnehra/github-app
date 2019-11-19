import React, { Component } from 'react'
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from '@material/react-card'
import TextField, { HelperText, Input } from '@material/react-text-field';

import '@material/react-card/dist/card.css';
import '@material/react-text-field/dist/text-field.css';

const SearchItem = ({ item }) => {
    return (
        <Card className='searchitem__container'>
            <CardPrimaryContent>
                <CardMedia square imageUrl={item.avatar_url} className="searchitem__media" />
                <div>
                    <p>{item.login}</p>
                </div>
            </CardPrimaryContent>
        </Card>
    )
}


class Search extends Component {
    state = {
        value: 'rishabh',
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
                <form onSubmit={this.submitHandler}>
                    <TextField
                        label="Enter Github's username"
                    ><Input
                            value={value}
                            onChange={(e) => this.setState({ value: e.currentTarget.value })} />
                    </TextField>
                </form>

                {items && items.map(item => <SearchItem item={item} />)}
            </div>
        );
    }
}

export default Search