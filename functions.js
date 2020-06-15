const chalk = require('chalk');

const {
  serveFunctions
} = require('netlify-cli/src/utils/serve-functions');

const settings = {
  functions: "src/functions",
  functionsPort: 5000
};

const {
  NETLIFYDEVLOG,
  NETLIFYDEVERR
} = {
  NETLIFYDEV: `${chalk.greenBright('◈')} ${chalk.rgb(40, 180, 170)('Netlify Dev')} ${chalk.greenBright('◈')}`,
  NETLIFYDEVLOG: `${chalk.greenBright('◈')}`,
  NETLIFYDEVWARN: `${chalk.yellowBright('◈')}`,
  NETLIFYDEVERR: `${chalk.redBright('◈')}`,
};

async function startFunctionsServer() {
  const functionsServer = await serveFunctions(settings.functions);
  functionsServer.listen(settings.functionsPort, function (err) {
    if (err) {
      console.error(`${NETLIFYDEVERR} Unable to start lambda server: `, err) // eslint-disable-line no-console
      process.exit(1)
    }
  
    // add newline because this often appears alongside the client devserver's output
    console.log(`\n${NETLIFYDEVLOG} Functions server is listening on ${settings.functionsPort}`) // eslint-disable-line no-console
  });
}

startFunctionsServer();
