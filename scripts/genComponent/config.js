const componentContent = (name) => {
  return `import React from 'react'

import { ${name}Props } from "./types";

const ${name} = (props: ${name}Props) => {
  const { props1, ...other } = props

  return <div {...other}></div>
}

export default ${name}`
}

const storyContent = (name) => {
  return `import { Meta, ComponentStoryObj } from '@storybook/react'

import ${name} from './${name}'

export default {
  title: 'components/${name}',
  component: ${name},
} as Meta<typeof ${name}>

type Story = ComponentStoryObj<typeof ${name}>

export const Base: Story = {
  render: ${name},
}
`
}

const testContent = (name) => {
  return `import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
  
import * as Stories from './${name}.stories'
  
const { StoryName } = composeStories(Stories)
  
describe('<${name} />', () => {
  describe('display', () => {
    it('should render ', () => {
      render(<StoryName />)
  
      expect(screen.getByText('')).toBeInTheDocument()
    })
  })
  
  describe('event', () => {
    it('should response ...', () => {
      render(<StoryName />)
    })
  })
})`
}

const propsContent = (name) => {
  return `export interface ${name}Props {
  key: type 
}`
}

const indexContent = (name) => {
  return `export { default } from './${name}'`
}

module.exports = {
  componentContent,
  indexContent,
  propsContent,
  storyContent,
  testContent,
}
