var fs = require('fs')
var _ = require('lodash')

var groups = [
    {
        variable: 'Images',
        path: 'images'
    }, {
        variable: 'Sprites',
        path: 'sprites'
    }, {
        variable: 'Tilesets',
        path: 'tilesets'
    }, {
    //     variable: 'Fonts',
    //     path: 'fonts',
    // }, {
        variable: 'Audio',
        path: 'audio'
    }, {
        variable: 'Data',
        path: 'data'
    },
]


var warningString = `/**
 * WARNING: this file is generated (by "assets" npm script). Don't change it manually.
 */`


var variablesString = groups.reduce((output, group) => {
    try {
        var groupPath = './assets/' + group.path

        if (!fs.existsSync(groupPath))
            return output

        var groupOutput = `let ${group.variable} = { \n`
        var folderContent = fs.readdirSync(groupPath)

        var properties = ''

        // if (group.variable !== 'Fonts') {
            properties = generateProperties(folderContent, group.path)
        // } else {
        //     properties = generateFontsProperties(folderContent)
        // }

        groupOutput += properties + '} \n \n'
    } catch (err) {
        console.error(err)
    }
    return output + groupOutput
}, '')


var exportString = 'export {'

exportString += groups.reduce((output, group) => {
    var groupPath = './assets/' + group.path

    if (!fs.existsSync(groupPath))
        return output

    return output += group.variable + ', '
}, '')

exportString += '}'

// console.log(variablesString, exportString)
fs.writeFile('./src/config/assets.js', variablesString + exportString, (err) => {
    if (err) throw err
})


function generateProperties(files, folder, ext = null) {
    var properties = ''

    files.forEach((file) => {
        var fileExt = file.split('.').pop()

        if (ext !== null && ext !== fileExt)
            return

        var name = file.substring(0, file.length - (fileExt.length + 1))
        name = _.camelCase(name)

        properties += `\t${name}: '${folder}/${file}',\n`
    })

    return properties
}


function generateFontsProperties(fonts) {
    var fontImage = 'image: {\n'
    var fontData = 'data: {\n'

    fonts.forEach((font) => {
        var fontFolderContent = fs.readdirSync('./assets/fonts/' + font)
        fontImage += generateProperties(fontFolderContent, 'fonts/' + font, 'png')
        fontData += generateProperties(fontFolderContent, 'fonts/' + font, 'xml')
    })

    fontImage += '},\n'
    fontData += '}\n'

    return fontImage + fontData
}
