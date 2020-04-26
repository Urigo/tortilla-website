export const encapsulate = () => {
  let prefix = Date.now()
  encapsulate._recent = encapsulate._recent === prefix && ++prefix

  return (str) => `${prefix}_${str}`
}
