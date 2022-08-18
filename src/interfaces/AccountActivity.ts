export enum AccountActivityTypeEnum {
    ProVote = "PRO_VOTE", //vote aye
    ConVote = "CON_VOTE", //vote nay
    Info = "INFO",
    CouncilorMissed = "COUNCILOR_MISSED", //council member missed to do something
    Treasury = "TREASURY" //activities around the treasury
}

//On-chain object that a user can interact with
export enum ActivityObject {
    Referenda = "referenda",
    CouncilMotion = "council motion",
    DemocracyProposal = "democracy proposal",
    Bounty = "bounty",
    TreasurySpend = "treasury spend",
    TreasuryTip = "treasury tip",
}

//Interaction a user can have with an ActivityObject
export enum Activity {
    Proposed = "proposed",
    VotedAye = "voted yay",
    VotedNay = "voted nay",
    MissedVote = "did not vote",
    Tipped = "tipped"

}

//Types of additional info given for an ActivtiyObject
export enum InfoType {
    Reason = "reason",
    Description = "description"
}

//Interface for an accounts activity e.g. with the treasury or related to governance
export interface AccountActivity {
    primaryObject: ActivityObject;
    primaryObjectNumber: number;
    secondaryObject: ActivityObject | null;
    secondaryObjectNumber: number; //index of object on chain, if available
    additionalInfoType: InfoType | null;
    additionalInfoValue: string | null;
    activity: Activity;
    block: number;
    type: AccountActivityTypeEnum;
}
