var replace = require('replace')

const common = { paths: ['./src'], recursive: true, silent: false }

replace({
  ...common,
  regex: 'fill-rule',
  replacement: 'fillRule',
})
replace({
  ...common,
  regex: 'clip-rule',
  replacement: 'clipRule',
})
replace({
  ...common,
  regex: 'clip-path',
  replacement: 'clipPath',
})
replace({
  ...common,
  regex: 'xmlns: xlink',
  replacement: 'xmlnsXlink',
})
replace({
  ...common,
  regex: 'xmlns:xlink',
  replacement: 'xmlnsXlink',
})
replace({
  ...common,
  regex: 'xlink:href',
  replacement: 'xlinkHref',
})
replace({
  ...common,
  regex: 'fill-opacity',
  replacement: 'fillOpacity',
})
replace({
  ...common,
  regex: 'stroke-width',
  replacement: 'strokeWidth',
})
replace({
  ...common,
  regex: 'stroke-linecap',
  replacement: 'strokeLinecap',
})

replace({
  ...common,
  regex: 'stroke-linejoin',
  replacement: 'strokeLinejoin',
})
