export interface ApiRequest {
    prompt: string;
    top_k?: number;
    top_p?: number;
    temperature?: number;
    max_new_tokens?: number;
    prompt_template?: string;
    presence_penalty?: number;
    frequency_penalty?: number;
}