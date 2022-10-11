import React, { useEffect, useState } from 'react'
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { CLEAR_STATES } from '../context/actions';
import Loading from './Loading';


const PostModal = () => {

  const {
    isLoading,
    post,
    user,
    otherComments,
    togglePostModal,
    postId,
    clearStates,
    getOtherComments,
  } = useAppContext()

  const navigate = useNavigate()
  const params = useParams()
  // const {postId} = useParams()

  const [userComments, setUserComments] = useState([])
  const [comment, setComment] = useState('')

  const HidePostModal = () => {
    togglePostModal(-1)
    navigate(-1)
    // clearStates()
    document.body.style.overflowY = 'auto'
    // window.history.replaceState(null, "Instagram", "/")
  }

  const getUserComments = async () => {
    const url = `/data/userComments.json`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(`usersComments:`, data);
    setUserComments(data)
  }

  const handleCommentInput = (e) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!comment) {
      console.log(`please input`);
      return
    }
    // addComment()
    console.log(comment);
  }

  useEffect(() => {
    getUserComments()
    document.body.style.overflowY = 'hidden'
    console.log(params);
    togglePostModal(params.postId)
  }, [params])

  if (isLoading) {
    <Loading center />
  }

  if (!post) {
    return (
      <div className="modal" onClick={HidePostModal}>
        <div className="close" onClick={HidePostModal}>
          &times;
        </div>
        {/* Modal content */}
        <div className='modal-content-full-1' onClick={e => e.stopPropagation()}>
          <h2>No jobs to display...</h2>
        </div>
      </div>


    )
  }

  return (
    // The Modal
    <div className="modal" onClick={HidePostModal}>
      <div className="close" onClick={HidePostModal}
      >&times;</div>
      {/* Modal content */}
      <div className='modal-content-full-1' onClick={e => e.stopPropagation()}>

        {/* Image and Caption */}
        <div className='modal-preview-1'>

          {/* Image */}
          <div className='modal-image'>
            <div className='modal-file-1'>
              <img src={post.image} alt={post.image} />
            </div>
          </div>

          {/* Owner info */}
          <div className='modal-caption-cover'>

            {/* Post owner info */}
            <div className='post-info-1'>
              <img className='icon-user-1 icon' src={post.user__avatar} alt={post.user__avatar} />

              {/* Follow Btn */}
              <div className='username-and-caption'>
                {post.user__username} <span style={{ cursor: 'pointer' }}>
                  ・ Following
                </span>
              </div>

              <BsThreeDots className='post-option' style={{ marginRight: '8px' }} />
            </div>

            {/* Caption and comment */}
            <div className='modal-caption-1'>
              {/* Caption */}
              {post.status &&
                <div className='post-info-1'>
                  <div>
                    <img className='icon-user-1 icon' src={post.user__avatar} alt={post.user__avatar} />
                  </div>

                  <div className='username-and-caption'>
                    {post.user__username} <span style={{ fontWeight: '400' }}>{post.status}</span>
                    {/* ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
                  </div>
                </div>
              }

              {/* user comments */}
              {userComments.map(comment => {
                return (
                  <div className='post-info-1' key={comment.id}>
                    <div>
                      <img className='icon-user-1 icon' src={user.avatar} alt={user.avatar} />
                    </div>

                    <div className='username-and-caption'>
                      {user.username} <span style={{ fontWeight: '400' }}>{comment.content}</span>
                    </div>
                  </div>
                )
              })}

              {/* Other comments */}
              {otherComments.filter(comment => comment.user__id !== parseInt(user.id)).map(comment => {
                return (
                  <div className='post-info-1' key={comment.id}>
                    <div>
                      <img className='icon-user-1 icon' src={comment.user__avatar} alt={comment.user__avatar} />
                    </div>

                    <div className='username-and-caption'>
                      {comment.user__username} <span style={{ fontWeight: '400' }}>{comment.content}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Like, comment, share, bookmark */}
            <div className='post-interact-container'>

              <div className='post-interact' style={{ borderTop: '1px solid rgba(var(--b6a, 219, 219, 219), 1)' }}>
                <div className='post-interact-icon-list'>
                  <AiOutlineHeart className='post-interact-icon icon'
                  />
                  <FaRegComment className='post-interact-icon icon' />
                  <FiSend className='post-interact-icon icon' />
                </div>
                <BsBookmark className='post-interact-icon icon' />
              </div>
            </div>

            {/* Like sum */}
            <div className='post-interact-info'>
              {/* <img className='icon icon-user' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" /> */}
              <div className='post-interact-like-sum'>
                liked by 1 person
              </div>

              <div className='post-date'>
                {post.timestamp}
              </div>
            </div>

            {/* Input comment */}
            <div className='modal-comment'>
              {/* <HiOutlineEmojiHappy className='modal-upload-emoji'/>
                <input type="text" value={comment} onChange={e=>setComment(e.target.value)} /> */}
              <div className='post-comment-icon'>
                <HiOutlineEmojiHappy className='HiOutlineEmojiHappy' />
                <input placeholder='Add comment...' name='comment' value={comment} onChange={handleCommentInput} />
              </div>

              <div className='post-comment-post'>
                Post
              </div>
            </div>

          </div>

        </div>


      </div>
    </div>
  )
}

export default PostModal