import { Stream, Token, register, instruction, data } from '../mod.ts';

export class Tokenizer {
    private input: string;
    private tokens: Token[];
    private idx: number;

    private newline = /\n/;
    private whitespace = /\s/;

    constructor(input: string) {
        this.input = input
        this.tokens = [];
        this.idx = 0;
    }

    public run(): this {
        while (this.idx < this.input.length) {
            let char = this.input[this.idx];

            switch (char) {
                case '$': {
                    let reg = char;
                    this.idx += 1;

                    if (this.idx < this.input.length) {
                        char = this.input[this.idx];

                        while ((char >= '1' && char <= '8') || char === 'r') {
                            reg += char;
                            this.idx += 1;
                            char = this.input[this.idx];
                        }
                    }

                    if (register.includes(reg)) {
                        this.tokens.push(['Register', reg]);
                    } else {
                        throw new Error(`[x16_x]: [Assembler(Hogen)]: No such register: ${reg}`)
                    }

                    break;
                }

                case '(':
                case ')': {
                    this.tokens.push(['Paren', char]);
                    this.idx += 1;
                    break;
                }

                case '{':
                case '}': {
                    this.tokens.push(['Curly', char]);
                    this.idx += 1;
                    break;
                }

                case '[':
                case ']': {
                    this.tokens.push(['Square', char]);
                    this.idx += 1;
                    break;
                }

                case '"':
                case '\'': {
                    const quote = char;
                    let val = '';
                    this.idx += 1;
                    char = this.input[this.idx];

                    while (char !== quote) {
                        val += char;
                        this.idx += 1;
                        char = this.input[this.idx];
                    }

                    this.idx += 1;
                    char = this.input[this.idx];
                    this.tokens.push(['String', val])

                    break;
                }

                case ',': {
                    this.tokens.push(['Comma', char]);
                    this.idx += 1;
                    break;
                }

                case '.': {
                    this.tokens.push(['Dot', char]);
                    this.idx += 1;
                    break;
                }

                case '/': {
                    this.idx += 1;

                    if (this.input[this.idx] === '/') {
                        while (this.idx < this.input.length && !this.newline.test(this.input[this.idx])) {
                            this.idx += 1;
                        }
                    }

                    else if (this.input[this.idx] === '*') {
                        this.idx += 1;

                        while (this.idx < this.input.length) {
                            this.idx += 1;
                            if (this.input[this.idx - 1] === '*' && this.input[this.idx] === '/') {
                                this.idx += 1;
                                break;
                            }
                        }
                    }

                    else {
                        this.tokens.push(['Op', '/']);
                    }

                    break;
                }

                default: {
                    if (this.whitespace.test(char) || this.newline.test(char)) {
                        this.idx += 1;
                    }

                    else if (char === '0' && this.input[this.idx + 1] === 'x') {
                        let data = '0x';
                        this.idx += 2;

                        if (this.idx < this.input.length) {
                            char = this.input[this.idx];

                            while ((char >= 'a' && char <= 'f') || (char >='A' && char <= 'F') || (char >= '0' && char <= '9')) {
                                data += char;
                                this.idx += 1;
                                char = this.input[this.idx];
                            }
                        }

                        this.tokens.push(['Data', data])
                    }

                    else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                        let wrd = char;
                        this.idx += 1;

                        if (this.idx < this.input.length) {
                            char = this.input[this.idx];

                            while ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '_') {
                                wrd += char;
                                this.idx += 1;
                                char = this.input[this.idx];
                            }
                        }

                        if (instruction.includes(wrd)) {
                            this.tokens.push(['Instruction', wrd])
                        }
                        
                        else if (data.includes(wrd)) {
                            this.tokens.push(['Data', wrd])
                        }
                        
                        else {
                            this.tokens.push(['Variable', wrd]);
                        }
                    }

                    else {
                        throw new Error(`[x16_x]: [Assembler(Hogen)]: Invalid or unsupported character: ${char}`);
                    }
                }
            }
        }

        return this;
    }

    public results(): Stream {
        return { input: this.input, output: [...this.tokens] };
    }
}