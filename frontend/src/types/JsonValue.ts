export type JsonPrimitive = null | boolean | number | string;

export type JsonArray = Array<JsonValue>;

export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = JsonPrimitive | JsonArray | JsonObject;
