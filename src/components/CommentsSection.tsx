import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp } from "lucide-react";

interface Reply {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
  avatar: string;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  likes: number;
  avatar: string;
  replies: Reply[];
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

const getAvatarUrl = (username: string): string => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username)}`;
};

const getInitials = (username: string): string => {
  return username
    .split(" ")
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const CommentItem = ({
  comment,
  onLike,
  onReply,
  isReply = false,
}: {
  comment: Comment | Reply;
  onLike: (id: string) => void;
  onReply?: (id: string, text: string) => void;
  isReply?: boolean;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim() && onReply) {
      onReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className={`flex gap-3 ${isReply ? "ml-12" : ""}`}>
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarImage src={comment.avatar} alt={comment.username} />
        <AvatarFallback>{getInitials(comment.username)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{comment.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(comment.timestamp)}
          </span>
        </div>
        
        <p className="text-sm mb-2">{comment.text}</p>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 hover:bg-accent"
            onClick={() => onLike(comment.id)}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {comment.likes > 0 && <span className="text-xs">{comment.likes}</span>}
          </Button>
          
          {!isReply && onReply && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs hover:bg-accent"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </Button>
          )}
        </div>
        
        {showReplyInput && (
          <div className="mt-3 flex gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Add a reply..."
                className="min-h-[60px] text-sm"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowReplyInput(false);
                    setReplyText("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {!isReply && "replies" in comment && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onLike={onLike}
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "Travel Enthusiast",
      text: "This is absolutely amazing! I've always wanted to visit these places. Your cinematography is stunning!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 156,
      avatar: getAvatarUrl("Travel Enthusiast"),
      replies: [
        {
          id: "1-1",
          username: "Adventure Seeker",
          text: "I completely agree! The drone shots were incredible.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          likes: 23,
          avatar: getAvatarUrl("Adventure Seeker"),
        },
      ],
    },
    {
      id: "2",
      username: "Nature Lover",
      text: "Beautiful scenery! Which camera did you use for this?",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      likes: 42,
      avatar: getAvatarUrl("Nature Lover"),
      replies: [],
    },
    {
      id: "3",
      username: "Wanderlust Soul",
      text: "Adding all of these destinations to my bucket list! Thanks for sharing this incredible journey.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      likes: 87,
      avatar: getAvatarUrl("Wanderlust Soul"),
      replies: [],
    },
  ]);
  
  const [newCommentText, setNewCommentText] = useState("");
  const [commentUsername, setCommentUsername] = useState("");

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      const username = commentUsername.trim() || "Anonymous User";
      const newComment: Comment = {
        id: Date.now().toString(),
        username,
        text: newCommentText,
        timestamp: new Date(),
        likes: 0,
        avatar: getAvatarUrl(username),
        replies: [],
      };
      setComments([newComment, ...comments]);
      setNewCommentText("");
      setCommentUsername("");
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
          ),
        };
      })
    );
  };

  const handleAddReply = (commentId: string, replyText: string) => {
    const username = commentUsername.trim() || "Anonymous User";
    const newReply: Reply = {
      id: `${commentId}-${Date.now()}`,
      username,
      text: replyText,
      timestamp: new Date(),
      likes: 0,
      avatar: getAvatarUrl(username),
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">{comments.length} Comments</h2>
      
      {/* Add comment form */}
      <div className="flex gap-3 mb-8">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            value={commentUsername}
            onChange={(e) => setCommentUsername(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-0 pb-2 text-sm bg-transparent border-0 border-b border-border focus:outline-none focus:border-primary transition-colors mb-2"
          />
          <Textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[80px]"
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setNewCommentText("");
                setCommentUsername("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddComment} disabled={!newCommentText.trim()}>
              Comment
            </Button>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={handleLikeComment}
            onReply={handleAddReply}
          />
        ))}
      </div>
    </div>
  );
};
