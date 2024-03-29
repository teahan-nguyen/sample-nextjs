/* eslint-disable no-console */
const fs = require('fs')

const prompts = require('prompts')

const {
  componentContent,
  indexContent,
  propsContent,
  storyContent,
  testContent,
} = require('./config')

const toPascalCase = (str) =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((items) => `${items.charAt(0).toUpperCase()}${items.slice(1)}`)
    .join('')

const questions = [
  {
    type: 'text',
    name: 'component',
    message: `Input name of component ?`,
  },
  {
    type: 'select',
    name: 'value',
    message: 'Pick components',
    choices: [
      { title: 'Assemble', value: 'assemble' },
      { title: 'Build', value: 'build' },
      { title: 'Combine', value: 'combine' },
      { title: 'Integrate', value: 'integrate' },
    ],
    initial: 1,
    hint: '- Enter to confirm',
  },
]

const createComponent = async (entry) => {
  const response = await prompts(questions)

  const arr = response.value
  const name = toPascalCase(response.component)

  const directory = entry + arr + '/' + name

  fs.access(directory, (err) => {
    if ((directory, err)) {
      fs.mkdir(directory, { recursive: true }, (e) => {
        if (e) {
          console.log(e)
        } else {
          fs.writeFileSync(`${directory}/types.ts`, propsContent(name))
          fs.writeFileSync(`${directory}/${name}.tsx`, componentContent(name))
          fs.writeFileSync(`${directory}/${name}.test.tsx`, testContent(name))
          fs.writeFileSync(`${directory}/${name}.stories.tsx`, storyContent(name))
          fs.writeFileSync(`${directory}/index.tsx`, indexContent(name))

          console.log('New Directory created successfully !!')
          console.log('Files created with custom content successfully')
        }
      })
    } else {
      console.log('Given Directory already exists !!')
    }
  })
}
createComponent('./src/components/')
