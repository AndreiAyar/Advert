/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const now = new Date().toISOString();
      const date = now.replace(/:/g, '-')
      let dir ='../../public/assets/images/' + date
      !fs.existsSync(dir) && fs.mkdirSync(dir);
        cb(null, '../../public/assets/images/'+ date);
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10240 * 10240 * 100
  },
  fileFilter: fileFilter
});*/