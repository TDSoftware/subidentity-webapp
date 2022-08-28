import { AccountActivity } from "@npmjs_tdsoftware/subidentity";
import { Activity, ActivityObject } from "@npmjs_tdsoftware/subidentity/lib/types/AccountActivity";

interface FormatActivity {
    text: string;
    iconName: string
}

const paths = [
    [ActivityObject.DemocracyProposal, "democracy_proposal"],
    [ActivityObject.Referenda, "referenda"],
    [ActivityObject.CouncilMotion, "council"],
    [ActivityObject.TreasuryTip, "treasury_tip"]
];

function createSubscanLink(activitiy: ActivityObject, id: number | string, chainName: string): string {
    const path = paths.filter(([a]) => activitiy === a).map(([a, path]) => path)[0] ?? "";
    let shortId = id;
    if (typeof shortId === "string" && shortId.length > 6) {
        shortId = shortId.substring(0, 6) + "...";
    }
    return `<a href="https://${chainName}.subscan.io/${path}/${id}" target="_blank">#${shortId}</a>`;
}

export function formatProfileActivity(accountActivity: AccountActivity, chainName: string, currencySymbol = ""): FormatActivity | undefined {
    if (accountActivity.primaryObject === ActivityObject.CouncilMotion
        && accountActivity.activity === Activity.Proposed) {
        return {
            text: `Proposed council motion ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}`,
            iconName: "information-circle-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.CouncilMotion
        && accountActivity.activity === Activity.VotedAye) {
        return {
            text: `Voted yay on council motion ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}`,
            iconName: "happy-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.CouncilMotion
        && accountActivity.activity === Activity.VotedAye) {
        return {
            text: `Voted nay on council motion ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}`,
            iconName: "sad-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.DemocracyProposal
        && accountActivity.secondaryObject === ActivityObject.Referenda
        && accountActivity.activity === Activity.Proposed) {
        if (!accountActivity.secondaryObjectValue) {
            throw new Error("[formatProfileActivity] Missing 'secondaryObjectValue' on activity object.");
        }
        return {
            text: `Added democracy proposal ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)} for referenda 
            ${createSubscanLink(accountActivity.secondaryObject, accountActivity.secondaryObjectValue, chainName)}`,
            iconName: "information-circle-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.Referenda
        && accountActivity.activity === Activity.VotedAye) {
        return {
            text: `Voted yay on referendum ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}`,
            iconName: "happy-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.Referenda
        && accountActivity.activity === Activity.VotedNay) {
        return {
            text: `Voted nay on referendum ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}`,
            iconName: "sad-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.TreasuryTip
        && accountActivity.activity === Activity.Tipped) {
        return {
            text: `Tipped ${accountActivity.secondaryObjectValue} ${currencySymbol} on treasury tip
                ${createSubscanLink(accountActivity.primaryObject, accountActivity.primaryObjectValue, chainName)}
            `,
            iconName: "wallet-outline.svg"
        };
    }
    if (accountActivity.primaryObject === ActivityObject.TreasuryTip
        && accountActivity.activity === Activity.Proposed) {
        return {
            text: `Proposed treasury tip for <a href="/chain/${chainName}/identity/${accountActivity.primaryObjectValue}">
            ${(accountActivity.primaryObjectValue as string).substring(0, 6)}...
            </a> with reason: ${accountActivity.additionalInfoValue}                
            `,
            iconName: "wallet-outline.svg"
        };
    }

    return {
        text: "",
        iconName: ""
    };
}