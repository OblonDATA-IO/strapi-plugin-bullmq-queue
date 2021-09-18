"use strict";

const { Queue } = require("bullmq");
const queue = new Queue("gridsome-builder");

module.exports = {
    async check (ctx) {
        const jobs = queue.getJobs(["wait", "delayed", "active"]);
        ctx.send({ "busy": jobs.length > 0 });
    },

    async publish (ctx) {
        await queue.add("myhouse.homes", "");
        ctx.send({ "success": true });
    },
};
