export const retrieveArguments = (argv) => { 
    let filenamesPath = [] // shape { id, filenamePath  }
    let optionalArgs = [] // shape { id, key, value }
    let counterFilename = 0
    let counterParams = 0

    for (let index = 0; index < argv.length; index++) {
        const element = argv[index];
        if (element.endsWith('.txt') ) {
            filenamesPath.push({
                id: counterFilename,
                filenamePath: element
            })
            counterFilename++
        }
        if (!isNaN(element) ) {
            optionalArgs.push({
                id: counterParams,
                key: argv[index - 1],
                value: element
            })
            counterParams++
        }
    }
    return {
        filenamesPath, // shape { id, filenamePath  }
        optionalArgs // shape { id, key, value }
    }
}