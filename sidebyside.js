import { retrieveArguments } from "./retrieveArguments.js";
import { getAllFilesContentPromises } from "./getAllFilesContentPromises.js";

let { filenamesPath } = retrieveArguments(process.argv)
let { optionalArgs } = retrieveArguments(process.argv)
const filesReceived = filenamesPath.length

/* Arguments */
let argWidthChar = '-w'
let widthColumn = 0;
let argCharSpace = '-c'
let numberSpaceChar = 0

/* Columnization */
let arrayRow = []
let hastTable = new Map()
let maxColumnSize = 0

const spaceCharLength = (numberSpaceChar, optionalArgs) => {
    if (optionalArgs.some(arg => arg.key === argCharSpace )) {
        numberSpaceChar = optionalArgs.find( arg => arg.key === argCharSpace ).value
    }
    return numberSpaceChar
}

async function sideBySide (filenamesPath) {

    await Promise.all(getAllFilesContentPromises(filenamesPath)).then(
        files => {

            (async () => {
                try {
                
                        files.map(file => maxColumnSize < file.columnsSize ? maxColumnSize = file.columnsSize : maxColumnSize)
                        
                        let columnCounter = 1
                        let fileNamePosition = 0
                        let maxCharLengthFile = 0
                
                        while(columnCounter < maxColumnSize ) {
                            let arrayFileLine = files[fileNamePosition].columnsFileContent[columnCounter].columnFileContent

                            maxCharLengthFile = 0
                            // Search maxCharLengthFile
                            files[fileNamePosition].columnsFileContent.map( columnFileContent => 
                                maxCharLengthFile < columnFileContent.columnLength ?
                                    maxCharLengthFile = columnFileContent.columnLength : 
                                    maxCharLengthFile
                            )
                            
                            // add the padding on columns using maxCharLengthFile 
                            let widthCharCurrentFile = arrayFileLine[0].length
                            for (widthCharCurrentFile; widthCharCurrentFile <= maxCharLengthFile - 1; widthCharCurrentFile++) {
                                arrayFileLine.push(' ')
                            }
                            
                            // add the space character between columns
                            for (let i = 0; i < spaceCharLength(numberSpaceChar,optionalArgs) - 1; i++) {
                                arrayFileLine.push(' ')
                            }
                            // add the fileLine to the arrayRow
                            arrayRow.push(arrayFileLine.join(''))
                            
                            // go to the next file
                            fileNamePosition++
                
                            // reach to the last file?, append it to a hashtable 
                            // and look to the other first file again
                            if (fileNamePosition === filesReceived) {
                                console.log(arrayRow.join(''))
                                fileNamePosition = 0
                                columnCounter++
                                hastTable.set(hastTable.size, arrayRow.join(''))
                                arrayRow = []
                            }   
                        }


                } catch (e) {
                  console.log(e)
                }
              })()

        }
    ).catch(
        e => console.log
    )
} 

sideBySide(filenamesPath)