export const getRef = key => document.querySelector(`[data-id='${key}']`)
export const setValue = (key, value) => getRef(key).innerText = value;

export const fallbackFields = {
  avatar: value => getRef('avatar').setAttribute('src', value)
}

export const DOMRefs = {
  btnSearch: getRef('btnSearch'),
  inputSearch: getRef('inputSearch'),
  container: getRef('container'),
  body: getRef('body'),
  btnSwitchTheme: getRef('btnSwitchTheme'),
  btnIconSvgSun: getRef('themeIconSun'),
  btnIconSvgMoon: getRef('themeIconMoon'),
  labelErrorSearch: getRef('labelErrorSearch')
}

export const toggleLoad = () => {
  DOMRefs.btnSearch.toggleAttribute('disabled')
  DOMRefs.container.classList.toggle('shine')
}

export const toggleTheme = () => {
  DOMRefs.body.classList.toggle('dark-theme')
  const themeRef = DOMRefs.btnSwitchTheme.querySelector('span')
  themeRef.innerText = themeRef.textContent === 'Dark' ? 'Light' : 'Dark'
  DOMRefs.btnIconSvgSun.classList.toggle('hidden')
  DOMRefs.btnIconSvgMoon.classList.toggle('hidden')
}

export const enterIsPressed = event => event.key === 'Enter' || event.keyCode === 13

export const toggleLabelSearchError = () => {
  const teenSeconds = 8000
  const displayError = DOMRefs.labelErrorSearch.style
  displayError.display = 'block'
  setInterval(() => (displayError.display = 'none'), teenSeconds)
}

export const populateGithubUser = async (user, fallbacks = fallbackFields) => {
  if (!Object.keys(user).length) {
    toggleLabelSearchError()
    return
  }
  const fallbackKeys = Object.keys(fallbacks) 
  const propsWithoutFallback = Object.keys(user).filter(key => !fallbackKeys.includes(key))
  propsWithoutFallback.forEach(key => setValue(key, user[key]));
  fallbackKeys.forEach(key => fallbacks[key](user[key]))
}
