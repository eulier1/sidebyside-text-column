import { once } from 'events';
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

export const getAllFilesContentPromises = (filenamesPath) => {

    let filesContentPromises = [] 

    for (let i = 0; i < filenamesPath.length; i++) {
        const filenamePath = filenamesPath[i].filenamePath;

        let fileContent = (async function processLineByLine(filenamePath) {
            try {
              let columnsFileContent = [] // { columnFileContent: [], columnLength: number  }
              let columnsSize = 0
              const rl = createInterface({
                input: createReadStream(filenamePath),
                crlfDelay: Infinity
              });
          
              rl.on('line', (line) => {
                // Process the line.
                columnsSize++
                columnsFileContent.push({
                    columnFileContent: line.split(),
                    columnLength: line.length
                })
              });
          
              await once(rl, 'close');
          
              //console.log('File processed.');
          
              return {
                columnsFileContent,
                filenamePath,
                columnsSize
              }

            } catch (err) {
              console.error(err);
            }
          })(filenamePath);
          filesContentPromises.push(fileContent) 
    }

    return filesContentPromises
}
