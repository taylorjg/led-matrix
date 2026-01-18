import { makeCharacterKvps } from "./utils";

// https://github.com/petykowski/London-Underground-Dot-Matrix-Typeface/blob/master/resources/examples/London-Underground-Medium.png

const uppercaseLetters = `
                                               
     xxx     xxxxxxxx      xxxxxx   xxxxxxxx   
     xxx     xxxxxxxxx    xxxxxxxx  xxxxxxxxx  
    xx xx    xx     xx   xxx    xxx xx     xxx 
    xx xx    xx     xx   xx      xx xx      xx 
   xx   xx   xx     xx  xx          xx       xx
   xx   xx   xxxxxxxx   xx          xx       xx
   xx   xx   xxxxxxxxx  xx          xx       xx
  xx     xx  xx     xxx xx          xx       xx
  xxxxxxxxx  xx      xx xx          xx       xx
  xxxxxxxxx  xx      xx  xx      xx xx      xx 
 xx       xx xx     xxx  xxx    xxx xx     xxx 
 xx       xx xxxxxxxxx    xxxxxxxx  xxxxxxxxx  
 xx       xx xxxxxxxx      xxxxxx   xxxxxxxx   
|           |          |           |           `;

const lowercaseLetters = `
         
         
         
         
  xxxxxx 
 xxxxxxxx
 xx    xx
       xx
  xxxxxxx
 xxxxx xx
 xx    xx
 xx    xx
 xxxxxxxx
  xxxx xx 
|        `;

const symbols = `
     
     
     
     
     
     
     
     
     
     
     
     
     
     
|    
`;

export const fontMap1 = new Map([
  ...makeCharacterKvps("ABCD", uppercaseLetters),
  ...makeCharacterKvps("a", lowercaseLetters),
  ...makeCharacterKvps(" ", symbols),
]);
