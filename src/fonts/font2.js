import { range } from "@app/utils";

// https://typofoto.wordpress.com/2014/06/19/dot-matrix-fonts/

const uppercaseLetters = `
                                                                                                                                        
  xx  xxx   xx  xxx  xxxx xxxx  xx  x  x xxx  xxx x  x x    x   x x  x  xx  xxx   xx   xxx   xx  xxxxx x  x x   x x   x x   x x   x xxxx
 x  x x  x x  x x  x x    x    x  x x  x  x     x x  x x    xx xx xx x x  x x  x x  x  x  x x  x   x   x  x x   x x   x x   x x   x    x
 x  x x  x x    x  x x    x    x    x  x  x     x x x  x    x x x x xx x  x x  x x  x  x  x x      x   x  x x   x x   x  x x   x x    x 
 xxxx xxx  x    x  x xxx  xxx  x xx xxxx  x     x xx   x    x x x x  x x  x xxx  x  x  xxx   xx    x   x  x x   x x x x   x     x    x  
 x  x x  x x    x  x x    x    x  x x  x  x     x x x  x    x   x x  x x  x x    x xx  x x     x   x   x  x x   x x x x  x x    x   x   
 x  x x  x x  x x  x x    x    x  x x  x  x  x  x x  x x    x   x x  x x  x x    x  x  x  x x  x   x   x  x  x x  xx xx x   x   x   x   
 x  x xxx   xx  xxx  xxxx x     xx  x  x xxx  xx  x  x xxxx x   x x  x  xx  x     xx x x  x  xx    x    xx    x   x   x x   x   x   xxxx
                                                                                                                                        
                                                                                                                                        
                                                                                                                                        `;

const lowercaseLetters = `
                                                                                                                                
      x            x        x       x    x   x x    x                                      x                                    
      x            x       x x      x          x    x                                      x                                    
  xx  xxx   xxx  xxx  xx   x    xxx xxx  x   x x  x x xx x  xxx   xx  xxx   xxx x x   xxx xxx  x  x x   x x   x x   x x  x xxxxx
    x x  x x    x  x x  x xxx  x  x x  x x   x x x  x x x x x  x x  x x  x x  x xx x x     x   x  x x   x x   x  x x  x  x    x 
  xxx x  x x    x  x xxxx  x   x  x x  x x   x xx   x x x x x  x x  x x  x x  x x     xx   x   x  x x   x x x x   x   x  x   x  
 x  x x  x x    x  x x     x   x  x x  x x   x x x  x x   x x  x x  x x  x x  x x       x  x   x  x  x x  xx xx  x x  x  x  x   
  xxx xxx   xxx  xxx  xxx  x    xxx x  x x   x x  x x x   x x  x  xx  xxx   xxx x    xxx    xx  xx    x   x   x x   x  xxx xxxxx
                                  x          x                        x       x                                          x      
                               xxx         xx                         x       x                                       xxx       
                                                                                                                                `;

const symbols = `
      
      
      
      
     x
 xxx  
     x
      
      
      
      
`;

const findBreaks = (lines) => {
  const lineLength = lines[0].length;
  const breaks = [];
  for (const index of range(lineLength)) {
    if (lines.every((line) => line[index] === " ")) {
      breaks.push(index);
    }
  }
  breaks.push(lineLength);
  return breaks;
};

const makeCharacterKvps = (characters, line) => {
  const lines = line.split("\n").filter(Boolean);
  const chs = Array.from(characters);
  const breaks = findBreaks(lines);

  console.assert(breaks.length == chs.length + 1);

  return chs.map((ch, index) => {
    const start = breaks[index];
    const end = breaks[index + 1] - 1;
    return [ch, { lines, start, end }];
  });
};

export const fontMap2 = new Map([
  ...makeCharacterKvps("ABCDEFGHIJKLMNOPQRSTUVWXYZ", uppercaseLetters),
  ...makeCharacterKvps("abcdefghijklmnopqrstuvwxyz", lowercaseLetters),
  ...makeCharacterKvps("-:", symbols),
  [" ", { lines: Array(11).fill("    "), start: 0, end: 3 }],
]);
