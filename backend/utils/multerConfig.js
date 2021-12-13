import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/images/club-crests',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (file, cb) => {
  const allowedFileTypes = /jpg|jpeg|png/;
  const extensionTypeValidation = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeTypeValidation = allowedFileTypes.test(file.mimetype);

  if (extensionTypeValidation && mimeTypeValidation) {
    return cb(null, true);
  } else {
    return cb('The image must be a JPG, JPEG, or PNG file up to 1.5mb.');
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    fileFilter(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 1.5
  }
});

export default upload;
