import React, {useState, useEffect} from 'react'
import { TextField, Typography, Button, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
    // hook useState
    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    })
    // fetching the updated post with id
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null )

    // styling with material ui
    const classes = useStyles()
    // assign hook useDispatch to call action creator (no need connect function and mapStateToProps)
    const dispatch = useDispatch()
    // dispatching createPost action


    // rendering current posts
    useEffect(() => {
            if(post) setPostData(post)
        }, [post]
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData)) // postData = state --> target.value --> redux store
        }

        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} > 
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                    <TextField 
                        name="creator" 
                        variant="outlined" 
                        label="Creator" 
                        fullWidth
                        value={postData.creator}
                        onChange={(e) => setPostData({ ...postData, creator: e.target.value })} // updating the state
                    />

                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })} // updating the state
                    />

                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })} // updating the state
                    />

                    <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} // updating the state
                    />

                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})} // updating the state
                        />
                    </div>

                    <Button 
                        className={classes.buttonSubmit} 
                        variant="contained" 
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={clear}
                        fullWidth
                    >
                        Clear
                    </Button>
                </form>
            </Paper>

        </div>
    )
}

export default Form
