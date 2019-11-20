import React from 'react'
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
} from '@material/react-top-app-bar'
import { Link } from 'react-router-dom'

import '@material/react-top-app-bar/dist/top-app-bar.css';

const Header = () => (
    <div>
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection align='start'>
                    <Link to="/"><TopAppBarTitle>Github App</TopAppBarTitle></Link>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
    </div>
)

export default Header