import { isEscapeKey } from './utils';

const bigPicturesConteiner = document.querySelector('.big-pictures');
const bigPicturesImage = bigPicturesConteiner.querySelector('.big-picture__img img');
const likeCount = bigPicturesConteiner.querySelector('.likes-count');
const commentsCount = bigPicturesConteiner.querySelector('.comments-count');
const socialComments = bigPicturesConteiner.querySelector('.social__comments');
const socialCaption = bigPicturesConteiner.querySelector('.social__caption');
const commentCountBlock = bigPicturesConteiner.querySelector('.social__count-comment');
const commentsLoader = bigPicturesConteiner.querySelector('.comments-loader');
const closeButton = bigPicturesConteiner.querySelector('.big-picture__button');
const COMMENTS_PER_LOAD = 5;

let commentsData = [];
let currentCommentsShown = 0;

const renderComments = () => {
  const nextComments = commentsData.slice(currentCommentsShown, currentCommentsShown + COMMENTS_PER_LOAD);

  nextComments.forEach(({ avatar, message, name }) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('.social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>`;
    socialComments.appendChild(commentElement);
  });

  currentCommentsShown += nextComments.length;
  commentCountBlock.textContent = `${currentCommentsShown} из ${commentsData.length} комментарев`;

  if (currentCommentsShown >= commentsData.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderFullSizePhoto = ({ url, likes, comments, description }) => {
  bigPicturesImage.src = url;
  likeCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  commentsData = comments;
  currentCommentsShown = 0;

  socialComments.innerHTML = '';
  renderComments();

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPicturesConteiner.classList.add('hidden');
};

const closeFullSizePhoto = () => {
  bigPicturesConteiner.classList.add('hidden');
  document.body.classList.add('modal-open');
};

closeButton.addEventListener('click', onDocumentKeydown);
function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}


commentsLoader.addEventListener('click', renderComments);


export { renderFullSizePhoto };
