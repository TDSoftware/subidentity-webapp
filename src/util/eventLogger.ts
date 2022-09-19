import { LogRequest } from "@/interfaces/LogRequest";
import { postRequest } from "./http";

export async function logEvent(info: string, event: string) {
    const request: LogRequest = {
        event,
        info
    };
    await postRequest("/log", request);
}