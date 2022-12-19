import { WITH_TLS_PROXY, BANK_MONKING } from "./modules/url-env.mjs";
import chalk from "chalk";

const WARNING_PREFIX = "Url env check warning: ";
const ERROR_PREFIX = "Url env check failed: ";

if (!WITH_TLS_PROXY) {
    console.warn(
        chalk.yellow(WARNING_PREFIX + "WITH_TLS_PROXY is set to false.")
    );
    // process.exit(1);
}

if (BANK_MONKING) {
    console.error(chalk.red(ERROR_PREFIX + "BANK_MONKING is set to true."));
    process.exit(1);
}
