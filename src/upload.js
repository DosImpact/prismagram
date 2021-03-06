import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "prismados",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

//만약에 multer을 이용해서 여러개의 파일을 한번에 업로드하려면
export const uploadsMiddleware = upload.array("photos", 3);
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const { file } = req;
  console.log(file);
  res.json(file);
  res.end();
};
