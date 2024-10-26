import {createRundomNumbers, createRandomMessages} from './utils.js';
import {createComments} from './comments.js';

export function createPhotoDescription() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i(),
      url: `photos/${i}.jpg`,
      description: createRandomMessages(),
      likes: createRundomNumbers(15, 200),
      comments: createComments()
    });
    return photos;
  }
}
