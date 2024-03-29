/* eslint-disable no-console */
const generateConstIds = () => {
  const input = process.argv[2]
  const keys = input.split('\n').map((v) => v.trim())

  console.log('🚀🚀🚀 Copy below here  🚀🚀🚀')
  keys.forEach((key) => console.log(`export const TEST_ID_${key.toUpperCase()} = '${key}'`))
  //
}

generateConstIds()
