import React from 'react'
import { useDispatch } from 'react-redux'
import { Panel, Button, ButtonToolbar } from 'rsuite'
import {
  deleteComments,
  updateComments,
} from '../features/comments/commentsSlice'

const Comment = ({ comment }) => {
  const dispatch = useDispatch()
  const handlePatch = (id, newObj) => {
    dispatch(updateComments({ id, newObj }))
    // console.log(comment.id)
  }
  return (
    <Panel header={<h1>{comment.id}</h1>} bordered style={{ margin: '20' }}>
      {comment.body}
      <ButtonToolbar style={{ marginTop: 10 }}>
        <Button
          color='red'
          size='lg'
          appearance='primary'
          onClick={() => dispatch(deleteComments(comment.id))}
        >
          Delete
        </Button>
        <Button
          color='green'
          size='lg'
          appearance='primary'
          onClick={() => handlePatch(comment.id, { body: 'UPDATED DATA' })}
        >
          Patch
        </Button>
      </ButtonToolbar>
    </Panel>
  )
}

export default Comment
