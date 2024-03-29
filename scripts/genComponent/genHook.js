/* eslint-disable no-console */
const fs = require('fs')

const prompts = require('prompts')

const questions = [
  {
    type: 'text',
    name: 'path',
    message: `Path ?`,
  },
]

const createHook = async (entry) => {
  const response = await prompts(questions)

  const path = response.path
  const name = path.substring(path.lastIndexOf('/') + 1, Infinity)

  const directory = entry + path

  fs.access(directory, (err) => {
    if ((directory, err)) {
      fs.mkdir(directory, { recursive: true }, (e) => {
        if (e) {
          console.log(e)
        } else {
          fs.writeFileSync(`${directory}/${name}.tsx`, `export default function ${name} () {}`)
          fs.writeFileSync(`${directory}/index.tsx`, `export { default } from './${name}'`)

          console.log('New Directory created successfully !!')
          console.log('Files created with custom content successfully')
        }
      })
    } else {
      console.log('Given Directory already exists !!')
    }
  })
}

createHook('./src/hooks/')
