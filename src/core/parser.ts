import { Stream, AST, Node, Parsed, Token } from '../mod.ts';

export class Parser {
    private stream: Stream;
    private body: (Node | Parsed)[];
    private idx: number;

    constructor(stream: Stream) {
        this.stream = stream;
        this.body = [];
        this.idx = 0;
    }

    public run(): this {
        while (this.idx < this.stream.output.length) {
            try { this.body.push(this.walk() as Node | Parsed) } catch (e) { throw e; };
        }

        return this;
    }

    private walk(): Node | Parsed | Error | undefined {
        let token: Token = this.stream.output[this.idx];

        switch (token[0]) {
            case 'Dot': {
                this.idx += 1;
                if (this.stream.output[this.idx][0] === 'Data') {
                    this.idx += 1;
                    return { type: 'Data', value: `.${this.stream.output[this.idx - 1][1]}` };
                } else return { type: 'Dot', value: '.' };
            }
        }
    }

    public results(): AST {
        return { input: this.stream.input, type: 'Program', body: this.body };
    }
}