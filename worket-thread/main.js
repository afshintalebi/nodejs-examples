const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

app.get("/resize-image", (req, res) => {
  const workerData = {
    imgSrc: `${__dirname}/image1.jpg`,
    imgWidth: 1600,
    imgHeight: 900,
  };

  const worker = new Worker(__dirname + "/resize_image_worker.js", {
    workerData,
  });

  worker.on("online", (data) => {
    console.log("Code executed in the thread.");
  });

  worker.on("error", (error) => {
    console.error(error);
  });

  setTimeout(() => {
    worker.postMessage({ message: "test message event" });
  }, 3000);

  res.json({
    message: "image has been resized by using the worker thread",
  });
});

app.listen(3000, () => {
  console.log("Run and listening on post 3000!");
});
