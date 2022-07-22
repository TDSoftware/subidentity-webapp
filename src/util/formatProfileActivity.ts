import { AccountActivity } from "@/interfaces/AccountActivity";

interface FormatActivity {
    text: string;
    iconName: string
}
export function formatProfileActivity(accountActivity: AccountActivity): FormatActivity {

    if (accountActivity.type === "PRO_VOTE") {
        return {
            text: "voted yay on council motion #100 for treasury spend #90",
            iconName: "happy-outline.svg"
        };
    } else if (accountActivity.type === "TREASURY") {
        return {
            text: "tipped on treasury tip with reason 'reason'",
            iconName: "wallet.svg"
        };

    } else if (accountActivity.type === "CON_VOTE") {
        return {
            text: "voted nay on council motion #99 for treasury spend #89",
            iconName: "sad-outline.svg"
        };
    } else if (accountActivity.type === "COUNCILOR_MISSED") {
        return {
            text: "did not vote on council motion #96 for treasury spend #84",
            iconName: "warning-outline.svg"
        };

    } else if (accountActivity.type === "INFO") {
        return {
            text: "proposed democracy proposal #17",
            iconName: "information-circle-outline.svg"
        };
    }
    return {
        text: "",
        iconName: ""
    };

}