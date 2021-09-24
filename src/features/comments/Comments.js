import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { commentsSelector, fetchComments } from './commentsSlice'
import Comment from '../../components/Comment'

const Comments = () => {
  const disptach = useDispatch()
  useEffect(() => {
    disptach(fetchComments(5))
  }, [disptach])

  const loading = useSelector((state) => state.comments.isLoading)

  // GETTING ARRAY OF OBJECTS FROM ENTITY STATE OBJECT
  const allComments = useSelector(commentsSelector.selectAll)

  if (loading) {
    return <h2>Loading ...</h2>
  }
  return (
    <div>
      {allComments &&
        allComments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />
        })}
    </div>
  )
}

export default Comments
