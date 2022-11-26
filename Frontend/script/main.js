import { DOMRefs, populateGithubUser, toggleLoad } from "./handle-ui.js";
import { githubService } from './github-service.js'

(() => {
  const { inputSearch, btnSearch } = DOMRefs
  let abortController = new AbortController()

  const getUserAndPopulateScreen = () => {
    const username = inputSearch.value
    if (!username) return
    toggleLoad()
    abortController.abort()
    abortController = new AbortController()
    githubService
      .getDataByUsername(username, abortController.signal)
      .then(populateGithubUser)
      .then(mappedUser => {
        toggleLoad()
        return mappedUser
      })
  }

  const enterIsPressed = event => event.key === 'Enter' || event.keyCode === 13

  btnSearch.onclick = getUserAndPopulateScreen
  inputSearch.onkeyup = event => enterIsPressed(event) && getUserAndPopulateScreen()
})()
