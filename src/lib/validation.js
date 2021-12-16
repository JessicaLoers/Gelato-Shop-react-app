const hasProductNameMinLenght = (name, stringLength) =>
    name.length > stringLength
  const hasValidCategory = (category) => category != ''
  const isPriceGraterThanZero = (price) => price > 0
  const isValidEmail = (email) => email.includes('@') && isValidDomain(email)
  const isValidDomain = (email) => email.split('@')[1].includes('.')

  const isProductValid = (product) => 
  hasProductNameMinLenght(product.name, 3) &&
  hasValidCategory(product.category) &&
  isPriceGraterThanZero(product.price) &&
  isValidEmail(product.contactEmail)

  export default isProductValid