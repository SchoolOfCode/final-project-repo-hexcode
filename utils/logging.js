import { ENV_TYPE_IS_DEVELOPMENT, ENV_TYPE } from "../config.js";

//only print out debug messages if we on development
export function debugOut(msgLocation, msgContent, isSeparateObject = false) {
    if (ENV_TYPE === ENV_TYPE_IS_DEVELOPMENT) {
        if (isSeparateObject) {
            console.log(`DEBUG:: ${msgLocation}: `);
            console.log(msgContent);
        } else {
            console.log(`DEBUG: ${msgLocation}: ${msgContent}`);
        }
    }
}

export function infoOut(msgLocation, msgContent, isSeparateObject = false) {
    if (isSeparateObject) {
        console.log(`${msgLocation}: `);
        console.log(msgContent);
    } else {
        console.log(`${msgLocation}: ${msgContent}`);
    }
}
