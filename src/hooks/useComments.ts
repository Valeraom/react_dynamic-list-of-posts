import { useEffect, useState } from 'react';

import { Comment } from '../types';
import * as commentsService from '../api/comments';

export const useComments = (selectedPostId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadComments = () => {
    setErrorMessage('');
    setIsLoading(true);

    commentsService
      .getComments(selectedPostId)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  const deleteComment = (commentId: number) => {
    return commentsService.deleteComment(commentId).then(() => {
      setComments(current =>
        current.filter(comment => comment.id !== commentId),
      );
    });
  };

  const addComment = (newComment: Omit<Comment, 'id'>) => {
    return commentsService
      .addComment(newComment)
      .then(comment => {
        setComments(current => [...current, comment]);
      })
      .catch(error => {
        setErrorMessage('Something went wrong');

        throw error;
      });
  };

  useEffect(loadComments, [selectedPostId]);

  return { comments, errorMessage, isLoading, deleteComment, addComment };
};
