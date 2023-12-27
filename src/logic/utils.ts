export const asyncDelay = (delay = 0) =>
  new Promise(res => setTimeout(res, delay))
