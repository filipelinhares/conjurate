const caseFn = require('change-case');

const getFirst = (str) => {
  const word = caseFn.kebab(str).split('-');
  const [first] = word;
  return first;
}

const getLast = (str) => {
  const word = caseFn.kebab(str).split('-');
  const last = word.slice(-1).pop();
  return last;
}

const placeholderMap = {
  '%camel%': caseFn.camel,
  '%constant%': caseFn.constant,
  '%lower%': caseFn.lower,
  '%lcFirst%': caseFn.lcFirst,
  '%no%': caseFn.no,
  '%kebab%': caseFn.kebab,
  '%pascal%': caseFn.pascal,
  '%path%': caseFn.path,
  '%sentence%': caseFn.sentence,
  '%snake%': caseFn.snake,
  '%swap%': caseFn.swap,
  '%title%': caseFn.title,
  '%upper%': caseFn.upper,
  '%ucFirst%': caseFn.ucFirst,
  '%first%': getFirst,
  '%last%': getLast,
};

const REGEX_CASES = new RegExp(Object.keys(placeholderMap).join('|'), 'g');

const parsePlaceholders = ({ match, replace }) => {
  return placeholderMap[match](replace);
}

module.exports = {
  parsePlaceholders,
  REGEX_CASES
}
