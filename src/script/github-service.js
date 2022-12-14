import { fetchAdapter } from "./httpClient.js"
import { getCache, setCacheExpiration } from "./simple-cache.js";

export const githubService = ((httpClient = fetchAdapter) => {
  const formatDate = date =>
    new Date(date).toLocaleString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const enShortText = (text, size = 15, end = '...') =>
    `${text?.slice(0, size)}${text?.length > size ? end : ''}`

  const mapToGithubUser = user => ({
    bio: user.bio ?? 'This profile has no bio',
    username: `@${user.login ?? 'not found'}`,
    followers: user.followers ?? 0,
    name: enShortText(user.name) ?? 'Has no name',
    following: user.following ?? 0,
    company: user.company ?? 'Has no company',
    blog: user.blog ?? 'Has no blog',
    location: user.location ?? 'Has no location',
    avatar: user.avatar_url ?? './src/images/user.png',
    repos: user.public_repos ?? 0,
    joinDate: formatDate(user.created_at),
    twitter: user.twitter_username ?? 'Not Available'
  })

  const getDataByUsername = async (username, signal = null) => {
    const cachedUser = getCache(username)
    if (cachedUser) return cachedUser
    const responseHttp = await httpClient({ url: `https://api.github.com/users/${username}`, signal })
    switch (responseHttp.statusCode) {
      case 200:
        const user = mapToGithubUser(responseHttp.body)
        setCacheExpiration(username, user)
        return user
      case 404:
        return []
      default:
        return Promise.reject('Something went wrong')
    }
  }

  return {
    getDataByUsername,
  }
})()
