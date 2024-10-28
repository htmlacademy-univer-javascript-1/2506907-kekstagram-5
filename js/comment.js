import {createRundomNumbers, createRandomMessages, createRandomAvatar} from '.utils.js';

export function createComment () {
  return {
    id: createRundomNumbers(1, 100000),
    avatar: createRandomAvatar(),
    messege: createRandomMessages(),
    name: createRundomNumbers()
  };
}
