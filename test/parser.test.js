import { Tokenizer, Parser } from '../src/mod.ts';

const tokenizer = new Tokenizer('.string').run();
const parser = new Parser(tokenizer.results()).run();

console.log(parser.results());