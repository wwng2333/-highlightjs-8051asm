/* 
  Language: Intel 8051 Assembly
  Description: 8051 assembly language
  Author: wwng2333 <wwng@2333.me>
*/

export default function(hljs) {
    return {
      name: 'Intel 8051 Assembly',
      case_insensitive: true,
      aliases: [ '8051' ],
      keywords: {
        $pattern: '\\.?' + hljs.IDENT_RE,
        keyword:
          'MOV MOVC MOVX PUSH POP XCH XCHD ' // DATA TRANSFER
          + 'ADD ADDC SUBB INC DEC MUL DIV DA' // ARITHMETIC
          + 'ANL ORL XRL CLR CPL RL RLC RR RRC SWAP ' // LOGICAL
          + 'SETB JC JNC JB JNB JBC ANL ' // BOOLEAN
          + 'LJMP AJMP SJMP JZ JNZ CJNE DJNZ NOP LCALL ACALL RET RETI JMP', // PROGRAM BRANCHING
          built_in:
          /* Special Function Registers (SFRs) */
          'A ACC B DPL DPH IE IP P0 P1 P2 P3 PCON PSW SCON SBUF SP TMOD TCON TL0 TH0 TL1 TH1 '
      },
      contains: [
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.COMMENT(
          ';',
          '$',
          { relevance: 0 }
        ),
        hljs.C_NUMBER_MODE, // 0x..., decimal, float
        hljs.BINARY_NUMBER_MODE, // 0b...
        {
          className: 'number',
          begin: '\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)' // $..., 0o...
        },
        hljs.BINARY_NUMBER_MODE, // 0b...
        {
          className: 'number',
          begin: '[0-9a-fA-F]+H' // 0A2H, 093H
        },
        hljs.QUOTE_STRING_MODE,
        {
          className: 'string',
          begin: '\'',
          end: '[^\\\\]\'',
          illegal: '[^\\\\][^\']'
        },
        {
          className: 'symbol',
          begin: '^[A-Za-z0-9_.$]+:'
        },
        {
          className: 'meta',
          begin: '#',
          end: '$'
        },
        { // substitution within a macro
          className: 'subst',
          begin: '@[0-9]+'
        }
      ]
    };
  }