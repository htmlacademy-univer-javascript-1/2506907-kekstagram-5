import { createPhotoDescription } from './photo.js';
import { renderPictures } from '.miniatureDrawing.js';
import { renderFullSizePhoto } from './fullSizePhoto.js';

renderPictures(createPhotoDescription());
renderFullSizePhoto();
