const path = require("path");

const uploadSingleFile = async (fileObject) => {
  const timestamp = Date.now();
  const extName = path.extname(fileObject.name);
  const baseName = path.basename(fileObject.name, extName);
  const fileName = `${baseName}_${timestamp}${extName}`;
  let uploadPath = path.join(__dirname, "..", "/public/images/", fileName);

  try {
    fileObject.mv(uploadPath);
    return {
      status: "success",
      fileName: fileName,
      patch: uploadPath,
      error: null,
    };
  } catch (err) {
    console.log(">>>error:", err);
    return {
      status: "failed",
      patch: null,
      error: JSON.stringify(err),
    };
  }
};
////////////////////////////////////////////////////////////////////////
const uploadMutlipleFile = async (fileObjects) => {
  const timestamp = Date.now();

  try {
    const uploads = [];
    for (const fileObject of fileObjects) {
      const extName = path.extname(fileObject.name);
      const baseName = path.basename(fileObject.name, extName);
      const fileName = `${baseName}_${timestamp}${extName}`;
      let uploadPath = path.join(__dirname, "..", "/public/images/", fileName);

      await fileObject.mv(uploadPath); // Sử dụng await để chờ việc di chuyển file

      uploads.push({
        fileName: fileName,
        path: uploadPath,
      });
    }

    return {
      status: "success",
      uploads: uploads,
      error: null,
    };
  } catch (err) {
    console.log(">>>error:", err);
    return {
      status: "failed",
      uploads: null,
      error: JSON.stringify(err),
    };
  }
};

module.exports = {
  uploadSingleFile,
  uploadMutlipleFile,
};
