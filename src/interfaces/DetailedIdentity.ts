import { Identity } from "@npmjs_tdsoftware/subidentity";
import { AccountActivity } from "./AccountActivity";


export interface DetailedIdentity extends Identity {
    treasury?: AccountActivity[];
    governance?: AccountActivity[];
} 