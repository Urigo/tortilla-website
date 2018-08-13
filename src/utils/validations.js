exports.validateEmail = (email) => {
  if (
    typeof email !== 'string' ||
    !(email instanceof String)
  ) {
    throw TypeError('provided argument must be a string')
  }

  if (!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email)) {
    throw TypeError('Provided string is not an email address')
  }
}

exports.validateLength = (str, length) => {
  if (
    typeof email !== 'string' ||
    !(email instanceof String)
  ) {
    throw TypeError('provided argument must be a string')
  }

  if (str.length > length) {
    throw TypeError(`Provided string must be ${length} chars at most`)
  }
}

exports.aggregateValidations(str, )
