const pluginId = require("../admin/src/pluginId");
const { Queue } = require("bullmq");

module.exports = {
    async check (ctx) {
        const { queueName, } = strapi.plugins[pluginId].config;
        const queue = new Queue(queueName ?? "gridsome-builder");
        const jobs = await queue.getJobs(["wait", "delayed", "active"]);
        ctx.send({ "busy": jobs.length > 0 });
    },
    async publish (ctx) {
        const { queueName, } = strapi.plugins[pluginId].config;
        const queue = new Queue(queueName ?? "gridsome-builder");
        await queue.add("myhouse.homes", "");
        ctx.send({ "success": true });
    },
};
