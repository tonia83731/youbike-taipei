export const getName = (name) => {
  const splitName = name.split("_");
  const result = splitName[1]
  return result
}