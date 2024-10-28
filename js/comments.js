import {createRundomNumbers} from './utils.js';
import {createComment} from './comment.js';

export function createComments() {
  const commentCount = createRundomNumbers(0, 30);
  const comments = [];
  for (let i = 0; i < commentCount; i++) {
    comments.push(createComment());
  }
  return comments;
}
