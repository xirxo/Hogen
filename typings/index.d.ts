export type Token = [string, string];

export interface Stream {
    input: string,
    output: Token[]
}

export interface AST {
    input: string;
    type: 'Program';
    body: (Node | Parsed)[]
}

export interface Node {
    type: string;
    body: (Node | Parsed)[]
}

export interface Parsed {
    type: string;
    value: string;
}