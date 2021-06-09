import { Tokenizer } from '../src/mod.ts';

const tokenizer = new Tokenizer('mov ($r1, 0x01AF)');
tokenizer.run();

console.log(tokenizer.results());