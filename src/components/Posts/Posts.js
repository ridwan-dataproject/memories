import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({setCurrentId}) => {
    // hook useSelector to communicate with redux store (no need connect and mapStateToProps)
    const posts = useSelector((state) => state.posts) // calling from redux store --> updated by useState at App.js
    // // styling with material ui
    const classes = useStyles()
    console.log(posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
     )
}

export default Posts
