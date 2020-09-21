const mime = require('mime-types')
const fs = require('fs');
const app = require('express')();
const fileUpload = require('express-fileupload');
const path = require('path')
const sharp = require('sharp')

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true
}));

const generateName = (file) => {
  let fileIndex = 1;
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.md5
  let newFileName = fileIndex++ + uniqueSuffix + '.' + mime.extension(file.mimetype)
  return newFileName;
}
const generateDir = () => {
  const now = new Date().toISOString();
  const folderPath = now.replace(/:/g, '-') + '-' + Math.round(Math.random() * 1E9)
  let dir = '../../upload/' + folderPath
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  return {
    dir,
    folderPath
  };
}

const handleProcessing = async (image, generatedPath, generatedName) => {
  await sharp(image).resize(1280).toFile((path.join(generatedPath.dir + '/') + generatedName), err => {
    if (err) {
      console.error(err);
      flag = true
      return;
    }
  })
}

app.post('/', async (req, res) => {
  console.log(req.body)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  let generatedPath = generateDir();
  console.log(generatedPath.dir)
  let files = req.files.file
  let src = [];
  let flag = false;
  if (files.length !== undefined) {
    files.map(async file => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        let generatedName = generateName(file)
        src.push({
          src: generatedPath.folderPath + '/' + generatedName
        })
       await handleProcessing(file.data, generatedPath, generatedName)
        /*
        file.mv((path.join(generatedPath.dir + '/') + generatedName), err => {
          if (err) {
            console.error(err);
            flag = true
            return;
          }
        });*/
      } else {
        fs.rmdirSync(generatedPath.dir)
        flag = true
        return;
      }
    });
  } else {
    //**** SINGLE FILE UPLOAD */
    let file = req.files.file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      let generatedName = generateName(file)
      src.push({
        src: generatedPath.folderPath + '/' + generatedName
      })
      await handleProcessing(file.data, generatedPath, generatedName)
      /*
      file.mv((path.join(generatedPath.dir + '/') + generatedName), err => {
        if (err) {
          console.error(err);
          flag = true
        }
      });*/
    } else {
      fs.rmdirSync(generatedPath.dir)
      flag = true
      return;
    }
  }
  if (!flag) {
    return res.json({ msg: 'Ok! ', src: src });
  } else {
    return res.status(400).json({ msg: 'Please upload only images!' });
  }
});

/*

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const now = new Date().toISOString();
      const date = now.replace(/:/g, '-')
      let dir ='../../public/assets/images/' + date
      !fs.existsSync(dir) && fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  
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
  fileFilter: fileFilter
  
  })
  app.post('/', upload.single('file'), function (req, res, next) {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    res.json({status: 'ok'});
  })
*/
module.exports = app;