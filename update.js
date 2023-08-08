const fs = require('fs')
const path = require('path')

function fromDir(startPath, filter, callback) {
  if (!fs.existsSync(startPath)) {
    console.log('No directory found: ', startPath)
    return
  }

  let files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i])
    let stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback)
    } else if (filter.test(filename)) callback(filename)
  }
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

fromDir('./', /\.js$/, function (filename) {
  let content = fs.readFileSync(filename, 'utf8')
  const substitutions = {}
  let newContent = content.replace(
    /import ([A-Za-z]+) from 'react-icons\/lib\/([a-z]+)\/([a-z-]+)'/g,
    function (_, p1, p2, p3) {
      let newP2 = p2.charAt(0).toUpperCase() + p2.slice(1)
      let newP3 = toPascalCase(p3)

      // Update import ocurrences
      substitutions[p1] = `${newP2}${newP3}`
      return `import { ${p1} } from 'react-icons/${p2}'`
    }
  )

  // Update component ocurrences
  Object.keys(substitutions).forEach(key => {
    newContent = newContent.replace(new RegExp(key, 'gms'), substitutions[key])
  })

  fs.writeFileSync(filename, newContent, 'utf8')
})

console.log('Updated imports')
