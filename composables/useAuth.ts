export const useAuth = () => {
  const isAuthenticated = useState('auth', () => false)
  
  const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value
  }
  
  const logout = () => {
    isAuthenticated.value = false
  }
  
  return {
    isAuthenticated: readonly(isAuthenticated),
    setIsAuthenticated,
    logout
  }
}

