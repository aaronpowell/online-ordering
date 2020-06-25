import { v4 as uuid } from "uuid"
const SESSION_KEY = "ONLINE_ORDER_SESSION"

const getSession = () => {
  let sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = uuid()
    localStorage.setItem(SESSION_KEY, sessionId)
  }

  return sessionId
}

const destroySession = () => {
  localStorage.removeItem(SESSION_KEY)
}

export { getSession, destroySession }
