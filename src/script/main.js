import { DOMRefs, populateGithubUser, toggleLoad, enterIsPressed, toggleTheme } from "./handle-ui.js";
import { githubService } from './github-service.js'

(() => {
  const { inputSearch, btnSearch, btnSwitchTheme } = DOMRefs
  let abortController = new AbortController()

  const getUserAndPopulateScreen = () => {
    const username = inputSearch.value?.toLowerCase()
    if (!username) return
    toggleLoad()
    abortController.abort()
    abortController = new AbortController()
    githubService
      .getDataByUsername(username, abortController.signal)
      .then(populateGithubUser)
      .finally(toggleLoad)
  }
  btnSwitchTheme.onclick = toggleTheme
  btnSearch.onclick = getUserAndPopulateScreen
  inputSearch.onkeyup = event => enterIsPressed(event) && getUserAndPopulateScreen()
})()
