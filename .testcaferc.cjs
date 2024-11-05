const { spawn } = require("child_process");

module.exports = {
  ...require("./.testcaferc.base.cjs"),
  // hooks: {
  //   testRun: {
  //     before: async (ctx) => {
  //       ctx.server = await startRemix();
  //     },
  //     after: async (ctx) => {
  //       ctx.server.kill();
  //     },
  //   },
  // },
};

function startRemix() {
  return new Promise((resolve) => {
    const child = spawn("pnpm", ["run", "dev"], {
      shell: true,
    });

    child.on("exit", (code, signal) => {
      console.log(`Closing Remix server due to receipt of signal '${signal}'`);
      child.stdin.end();
      child.stdout.destroy();
      child.stderr.destroy();
    });

    child.stderr.on("data", (data) => {
      console.error(`[server - stderr]: ${data}`);
    });

    child.stdout.on("data", (data) => {
      console.log(`[server - stdout]: ${data}`);
      if (data.includes("listening")) resolve(child);
    });
  });
}
