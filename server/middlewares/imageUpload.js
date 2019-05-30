import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toLocaleDateString()+ file.originalname);
  }
});

const fileFilter = (res, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(
    path.extname(file.originalname)
      .toLowerCase());

  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error! Images only");
  }
};

export default multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});