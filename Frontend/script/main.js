const makeUrl = username => `https://api.github.com/users/${username}`
const handleStatus = res => res.ok ? res.json() : Promise.reject(res.statusText)

const mapToGithubUser = user => ({
  bio: user.bio ?? '',
  username: user.login ?? '',
  followers: user.followers ?? 0,
  name: user.name ?? '',
  following: user.following ?? 0,
  company: user.company ?? '',
  blog: user.blog ?? '',
  location: user.location ?? '',
  avatar: user.avatar_url ?? '',
  repositories: user.public_repos ?? 0
})

const getDataByUsername = async username =>
  fetch(makeUrl(username))
  .then(handleStatus)
  .then(r => {
    console.log(r)
    return r
  })
  .then(mapToGithubUser)

getDataByUsername('Nicasiomarques')
.then(console.log)
