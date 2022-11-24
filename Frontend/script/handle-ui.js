const $ = document.querySelector.bind(document)
export const getRef = key => $(`[data-id='${key}']`)
export const setValue = (key, value) => $(`[data-id='${key}']`).innerText = value;

export const fallbackFields = {
  avatar: value => getRef('avatar').setAttribute('src', value)
}

export const DOMRefs = {
  btnSearch: getRef('btnSearch'),
  inputSearch: getRef('inputSearch')
}

export const populateGithubUser = async (user, fallbacks = fallbackFields) => {
  const fallbackKeys = Object.keys(fallbacks) 
  const propsWithoutFallback = Object.keys(user).filter(key => !fallbackKeys.includes(key))
  propsWithoutFallback.forEach(key => setValue(key, user[key]));
  fallbackKeys.forEach(key => fallbacks[key](user[key]))
}
