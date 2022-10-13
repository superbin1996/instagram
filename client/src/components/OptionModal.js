import { useEffect } from 'react'
import { useAppContext } from '../context/appContext'


const OptionModal = () => {
  const {
    toggleOptionModal,
    post,
    user,
    toggleEditModal,
  } = useAppContext()

  useEffect(() => {
  }, [])

  function selfPostOption(userId) {
    // user.id is string, so change it to integer
    if (String(userId) === String(user.id)) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <div className="modal" onClick={()=>toggleOptionModal(post)} style={{zIndex:100}}>
      <div className='option-content' onClick={e => e.stopPropagation()}>
        {selfPostOption(post.user__id) ?
          // Self post
          <div>
            <div className="option-content-item" style={{ color: 'red' }}>
              Delete
            </div>

            <div className="option-content-item" style={{ color: 'red' }} onClick={toggleEditModal} >
              Edit
            </div>

            <div className="option-content-item">Hide like count</div>
            <div className="option-content-item">Turn off commenting</div>

          </div>
          :
          // Others post
          <div>
            <div className="option-content-item">
              Report
            </div>

            <div className="option-content-item" style={{ color: 'red' }}>
              {true ? `Following` : `Follow`}
            </div>
          </div>
        }

        <div className="option-content-item">Go to post</div>
        <div className="option-content-item">Share to...</div>
        <div className="option-content-item">Copy Link</div>
        <div className="option-content-item">Embed</div>

        <div className="option-content-item" style={{ border: 'none', color: 'red' }} onClick={()=>toggleOptionModal(post)}>
          Cancel
        </div>

      </div>

    </div>
  )
}

export default OptionModal