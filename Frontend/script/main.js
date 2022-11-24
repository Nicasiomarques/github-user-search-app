import { DOMRefs, populateGithubUser } from "./handle-ui.js";
import { githubService } from './github-service.js'

(() => {
  const { inputSearch, btnSearch } = DOMRefs
  
  const getUserAndPopulateScreen = () => {
    const username = inputSearch.value
    if (!username) return
    githubService
      .getDataByUsername(username)
      .then(populateGithubUser)
  }

  const enterIsPressed = event => event.key === 'Enter' || event.keyCode === 13

  btnSearch.onclick = getUserAndPopulateScreen
  inputSearch.onkeyup = event => enterIsPressed(event) && getUserAndPopulateScreen()
})()
