import { isEscapeKey } from './util.js';
import { resetScale, updateScaleStyles } from './picture-scale.js';
import { hideSlider } from './picture-effects.js';
import { sendData } from './api.js';

const MAX_HASHTAG_LENGTH = 5;
const COMMENTS_MAX_LENGTH = 140;
const ONE_VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const ValidationErrorTexts = {
  MAX_HASHTAGS_COUNT: 'Нельзя указывать больше 5 хештегов',
  UNIQ_HASHTAGS: 'Хештеги не должны повторяться',
  INVALID_HASHTAG: 'Невалидный формат хештега',
  MAX_COMMENT_LENGTH: 'Длина комментария должна быть меньше 140 символов',
};

const body = document.querySelector('body');
const imgUploadInput = body.querySelector('.img-upload__input');
const imgUploadOverlay = body.querySelector('.img-upload__overlay');
const imgUploadForm = body.querySelector('.img-upload__form');
const imgPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
const effectsPreview = imgUploadOverlay.querySelectorAll('.effects__preview');

const closeImgUploadButton = body.querySelector('.img-upload__cancel');
const submitImgUploadButton = body.querySelector('.img-upload__submit');

const textHashtagsField = body.querySelector('.text__hashtags');
const textDescriptionField = body.querySelector('.text__description');

const errorMessage = document.querySelector('.error');
const successMessage = document.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const isFocused = (element) => document.activeElement === element;

const onFormKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFocused(textDescriptionField) && !isFocused(textHashtagsField)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onFormKeydown);
}

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  
  // Сбрасываем форму и валидатор
  imgUploadForm.reset();
  pristineValidator.reset(); // Сброс состояния валидатора
  resetScale();
  updateScaleStyles();
  hideSlider();

  document.removeEventListener('keydown', onFormKeydown);
}

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  imgPreview.src = URL.createObjectURL(file);
  effectsPreview.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = `url('${imgPreview.src}')`;
  });
  openUploadOverlay();
});

closeImgUploadButton.addEventListener('click', () => {
  closeUploadOverlay();
});

const onMessageKeydown = (messageType) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(messageType);
  }
};

function openMessage(messageType) {
  messageType.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onMessageKeydown(messageType));
  document.removeEventListener('keydown', onFormKeydown);
}

function closeMessage(messageType) {
  messageType.classList.add('hidden');
  if (messageType === errorMessage) {
    imgUploadOverlay.classList.remove('hidden');
  } else {
    body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', onMessageKeydown(messageType));
  document.addEventListener('keydown', onFormKeydown);
  submitImgUploadButton.removeAttribute('disabled');
}

successButton.addEventListener('click', () => {
  closeMessage(successMessage);
});

errorButton.addEventListener('click', () => {
  closeMessage(errorMessage);
});

const pristineValidator = new Pristine(
  imgUploadForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error',
  }
);

const validateHashtagsLength = (hashtagString) => {
  if (!hashtagString.trim()) {
    return true; // Пустая строка валидна
  }
  const hashtags = hashtagString.trim().split(/\s+/);
  return hashtags.length <= MAX_HASHTAG_LENGTH;
};

const validateHashtagUniqueness = (hashtagString) => {
  if (!hashtagString.trim()) {
    return true; // Пустая строка валидна
  }
  const hashtags = hashtagString.trim().toLowerCase().split(/\s+/);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagFormat = (hashtagString) => {
  if (!hashtagString.trim()) {
    return true; // Пустая строка валидна
  }
  const hashtags = hashtagString.trim().split(/\s+/);
  return hashtags.every((tag) => ONE_VALID_HASHTAG.test(tag));
};

const validateComments = (commentsString) => commentsString.trim().length <= COMMENTS_MAX_LENGTH;

pristineValidator.addValidator(
  textHashtagsField,
  validateHashtagsLength,
  ValidationErrorTexts.MAX_HASHTAGS_COUNT
);

pristineValidator.addValidator(
  textHashtagsField,
  validateHashtagUniqueness,
  ValidationErrorTexts.UNIQ_HASHTAGS
);

pristineValidator.addValidator(
  textHashtagsField,
  validateHashtagFormat,
  ValidationErrorTexts.INVALID_HASHTAG
);

pristineValidator.addValidator(
  textDescriptionField,
  validateComments,
  ValidationErrorTexts.MAX_COMMENT_LENGTH
);

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristineValidator.validate();
    if (isValid) {
      submitImgUploadButton.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadOverlay();
          openMessage(successMessage);
        })
        .catch(() => {
          imgUploadOverlay.classList.add('hidden');
          openMessage(errorMessage);
        })
        .finally(() => {
          submitImgUploadButton.disabled = false;
        });
    }
  });
};

export { setUserFormSubmit };
