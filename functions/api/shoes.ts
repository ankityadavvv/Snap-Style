import { neemansShoes } from "../../shared/data";

export async function onRequestGet(context) {
    return new Response(JSON.stringify(neemansShoes), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
