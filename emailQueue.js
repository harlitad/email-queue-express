const { sendMail } = require("./serviceEmail");
const Queue = require("bull");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const emailQueue = new Queue("send email", "redis://127.0.0.1:6379", {
  limiter: {
    max: 1000,
    duration: 5000,
  },
});
const options = {
  attempts: 2, // if failed, 2 times retry
};

const { router } = createBullBoard([new BullAdapter(emailQueue)]);

// consumer/worker of queue with concurrency of 2.
emailQueue.process(2, async (job, done) => {
  sendMail(job.data.email)
    .then((result) => done(null, result))
    .catch((err) => done(err));
  // instead of using done(), we can use return promises
  // return sendMail(job.data.email);
});

// listener
emailQueue.on("completed", (job, result) => {
  console.log(`Job completed with result : `, result);
});

insertEmailQueue = (email) => {
  emailQueue.add({ email }, options, { priority: 1 });
};

module.exports = {
  insertEmailQueue,
  routerBoard: router,
};
