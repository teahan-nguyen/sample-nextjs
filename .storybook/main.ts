import type { StorybookConfig } from '@storybook/nextjs'
const path = require('path')

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, { configType }) => {
    //@ts-ignore: Unreachable code error
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules']

    //@ts-ignore: Unreachable code error
    config.resolve.alias = {
      //@ts-ignore: Unreachable code error
      ...config.resolve.alias,
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/stores': path.resolve(__dirname, '../src/stores'),
      '@/*': path.resolve(__dirname, '../src/*'),
      '@': path.resolve(__dirname, '../src'),
      '@/': path.resolve(__dirname, '../src/'),
    }

    return config
  },
  staticDirs: ['../public'],
}
export default config
