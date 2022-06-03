import { GetVersionResponse } from "@/interfaces/http/GetVersionResponse";

console.log("[http] API URL is: ", process.env.VUE_APP_API_URL);

let apiAvailableCache: boolean;

export async function apiAvailable(): Promise<boolean> {
    if (typeof apiAvailableCache === "boolean") return apiAvailableCache;
    if (!process.env.VUE_APP_API_URL) {
        apiAvailableCache = false;
        return false;
    }

    try {
        const response = await getRequest<GetVersionResponse>("/version");
        console.log("[http] Got API reponse with version: ", response.version);
        apiAvailableCache = true;
        return true;
    } catch (e) {
        console.error("[http] Couldn't reach API instance!", e.message);
        apiAvailableCache = false;
        return false;
    }
}

export async function getRequest<ResponseType>(url: string): Promise<ResponseType> {
    if (!url.startsWith("/")) url = "/" + url;
    const rawResponse = await fetch(process.env.VUE_APP_API_URL + url);
    if (!rawResponse.ok) {
        throw new Error(rawResponse.statusText);
    }
    const response: ResponseType = await rawResponse.json();
    return response;
}

export async function postRequest<RequestType, ResponseType>(url: string, data: RequestType): Promise<ResponseType> {
    if (!url.startsWith("/")) url = "/" + url;
    const rawResponse = await fetch(process.env.VUE_APP_API_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await rawResponse.json();
}