# Hogen
🚀 An assembler for my [x16_x](https://github.com/xirxo/x16_x 'x16_x')project

# Example
The Hogen assembler uses C-like syntax for the assembly.
```c
// Single line comment
/*
    Multiple line comment
*/

// Variable declaration
// .[data type] [variable name] [variable value]
.string hello_world 'hello world'

// Adding value to a register
// add [register], [value]
add $r1, hello_world

// Both of this are valid
mov($r2, 0xAB64)
mov $r2, 0xAB64
```
> I'll add more examples later

# Assembler API
## Instructions
* `mov`
* `add`
* `psh`
* `pop`
* `cal`
* `jmp`
* `ret`
* `hlt`

## Registers
* `$r1`
* `$r2`
* `$r3`
* `$r4`
* `$r5`
* `$r6`
* `$r7`
* `$r8`

## Data types
* `char`
* `string`
* `bool`
* `i32`
* `i64`
* `u32`
* `u64`