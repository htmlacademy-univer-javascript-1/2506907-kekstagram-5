function createRundomNumbers (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomMessages() {
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return MESSAGES[createRundomNumbers(0, MESSAGES.length - 1)];
}

function createRandomAvatar() {
  return `img/avatar-${createRundomNumbers(1, 6)}.svg`;
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {createRandomAvatar, createRandomMessages, createRundomNumbers, isEscapeKey};
