import { parseArgs } from "util";

export const stringFormat = (str, ...args) => 
    str.replace(/{(\d+)}/g, (mach, index) => args[index].toString() || "");