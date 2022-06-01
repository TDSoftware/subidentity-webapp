import { Identity, Page } from "@npmjs_tdsoftware/subidentity"

export interface GetIdentitiesResponse {
    identities: Page<Identity>
}