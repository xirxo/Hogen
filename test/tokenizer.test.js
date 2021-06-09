import { Tokenizer } from '../src/mod.ts';

const tokenizer = new Tokenizer(
    `
    .string hello_world 'hello world'
    add $r1, hello_world
    `
);
tokenizer.run();

console.log(tokenizer.results());