const { sendMail } = require("./serviceEmail");
const Queue = require("bull");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const emailQueue = new Queue("send email", "redis://127.0.0.1:6379", {
  limiter: {
    max: 2,
    duration: 60000,
  },
});
const { router } = createBullBoard([new BullAdapter(emailQueue)]);

emailQueue.process(async (job) => {
  return sendMail(job.data.email);
});

emailQueue.on("completed", (job, result) => {
  console.log(result);
  console.log(`Job completed with result`);
});

module.exports = {
    emailQueue,
    routerBoard : router
}