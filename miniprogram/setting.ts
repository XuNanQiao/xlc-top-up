let env: string = 'production'
// env = 'dev' 
// env = 'hybrid'
// env = 'local'z


let envVar = {
  environment: env,
  version: '1.1.1beta',
  appVersion: "1.1.1beta",
  authEndPoint: 'https://auth.xlcwx.com',
  apiEndPoint: 'https://api.xlcwx.com',
  webEndPoint: 'https://www.xlcwx.com',
  apiSocketEndPoint: 'wss://api.xlcwx.com',
  ApiChatEndPoint: 'https://chatim.xlcwx.com',
  eventApiEndPoint: 'https://eventapi.xlcwx.com',
  siteUrl: "https://m.xlcwx.com",
  navigateToAppID: "wx92978cc11bec006e"
}

if (env === 'dev') {
  envVar.authEndPoint = 'http://auth.xlc01.com'
  envVar.apiEndPoint = 'http://api.xlc01.com'/* http://api.xlc01.com */
  envVar.webEndPoint = 'http://www.xlc01.com'
  envVar.apiSocketEndPoint = 'ws://api.xlc01.com'
  envVar.eventApiEndPoint = 'http://eventapi.xlc01.com'
  envVar.ApiChatEndPoint = 'http://chatim.xlc01.com:44340',
    envVar.siteUrl = "http://m.xlc01.com",
    envVar.navigateToAppID = "wx92978cc11bec006e"
}
if (env === 'hybrid') {
  envVar.authEndPoint = 'http://auth.xlc01.com'
  envVar.apiEndPoint = 'http://192.168.2.123:8021'
  envVar.webEndPoint = 'http://www.xlc01.com'
  envVar.apiSocketEndPoint = 'ws://192.168.2.116:61439'
  envVar.eventApiEndPoint = 'http://eventapi.xlc01.com'
  envVar.ApiChatEndPoint = 'http://chatim.xlc01.com:44340',
    envVar.siteUrl = "http://m.xlc01.com",
    envVar.navigateToAppID = "wx92978cc11bec006e"
}
if (env === 'local') {
  envVar.authEndPoint = 'http://auth.xlc01.com'
  envVar.apiEndPoint = 'http://localhost:61439'
  envVar.apiSocketEndPoint = 'ws://api.xlc01.com',
    envVar.siteUrl = "http://m.xlc01.com",
    envVar.navigateToAppID = "wx92978cc11bec006e"
}

export let setting = envVar
