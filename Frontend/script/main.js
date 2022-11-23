const makeUrl = username => `https://api.github.com/users/${username}`
const handleStatus = res => res.ok ? res.json() : Promise.reject(res.statusText)

const formatDate = date => {
  return new Date(date).toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const mapToGithubUser = user => ({
  bio: user.bio ?? 'This profile has no bio', 
  username: (user.login),
  followers: user.followers ?? 0,
  name: user.name ?? 'Has no name',
  following: user.following ?? 0,
  company: user.company ?? '',
  blog: user.blog ?? 'Has no blog',
  location: user.location ?? '',
  avatar: user.avatar_url ?? '',
  repos: user.public_repos ?? 0,
  joinDate: formatDate(user.created_at),
  twitter: user.twitter_username ?? 'Not Available'
})

const getDataByUsername = async username =>
  fetch(makeUrl(username))
    .then(handleStatus)
    .then(mapToGithubUser)

const $ = document.querySelector.bind(document)

const getRef = key => $(`[data-id='${key}']`)
const setValue = (key, value) => $(`[data-id='${key}']`).innerText = value;

const fallbackFields = {
  avatar: (value) => getRef('avatar').setAttribute('src', value)
} 

const populateGithubUser = async (user, fallbacks = fallbackFields) => {
  const fallbackKeys = Object.keys(fallbacks) 
  const propsWithoutFallback = Object.keys(user).filter(key => !fallbackKeys.includes(key))
  propsWithoutFallback.forEach(key => setValue(key, user[key]));
  fallbackKeys.forEach(key => fallbacks[key](user[key]))
}

(() => {
  getRef('btnSearch').addEventListener('click', _ => {
    const username = getRef('inputSearch').value
    if (!username) return
    getDataByUsername(username)
      .then(populateGithubUser)
      .catch(console.error)
  })
})()
