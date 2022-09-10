export const isValidURL = (urlString: string) => {
  try {
    return Boolean(new URL(urlString))
  } catch (e) {
    return false
  }
}
