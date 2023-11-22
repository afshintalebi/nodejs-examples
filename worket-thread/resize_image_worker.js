const sharp = require("sharp");
const { workerData, parentPort,threadId } = require("worker_threads");

const { imgSrc, imgWidth, imgHeight } = workerData;
const [fileName, extension] = imgSrc.split(".");

const resize = async () => {
  await sharp(imgSrc)
    .resize(imgWidth, imgHeight, { fit: "cover" })
    .toFile(`${fileName}-${imgWidth}x${imgHeight}.${extension}`);
};

parentPort.on("message", (data) => {
  console.log(`Image resized on worker thread with ID: ${threadId}`);
});

resize();
