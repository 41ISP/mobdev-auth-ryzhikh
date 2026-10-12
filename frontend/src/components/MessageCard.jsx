import {api} from "../api/api"
import {useUserStore} from "../store/useUserStore"

const MessageCard = ({ id, userId, likes, likedBy, content, username, createdAt }) => {
    const {session} = useUserStore()
    const handleDelete = async () => { 
         await api.deleteMessage(id)
    }
    
    const handelLike = async () => {
       await api.likeMessage(id)
    }

    const handelReport = async () => {
      await api.reportMessage(id)
    }

    

    return (
        <div className="message-card">
            <div className="message-content">{content}</div>
            <div className="message-meta">
                <span className="message-author">@{username}</span>
                <span className="message-time">{createdAt}</span>
            </div>
            <div className="message-actions">
                {session?.user && (
                <>
                <button onClick={handleLike} className="action-button">
                    <span>{likes} {likedBy.includes(session.user.id) ? "💗" : "🤍"}</span>
                    <span>Нравится</span>
                </button>
                <button onClick={handelReport} className="action-button">
                    <span>🚩</span>
                    <span>Пожаловаться</span>
                </button>
                </>
                )}
                {userId === session?.user.id &&( 
                 <button onClick = {handleDelete}className="action-button delete">
                    <span>❌</span>
                    <span>Удалить</span>
                </button>
                )}
            </div>
        </div>
    )
}

export default MessageCard
