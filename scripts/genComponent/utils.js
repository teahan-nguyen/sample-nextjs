const fs = require('fs')

export const writeToFile = ({ path, content }) => {
  fs.writeFileSync(path, content)
}
