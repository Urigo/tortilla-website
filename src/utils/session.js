const SSRStorage = {
  getItem() {},
  setItem() {},
  removeItem() {},
}

export default (typeof window !== 'undefined' ? sessionStorage : SSRStorage)
