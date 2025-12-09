import { exampleScenarios } from "../../shared/data";

export async function onRequestGet(context) {
    return new Response(JSON.stringify(exampleScenarios), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
