import { User } from 'firebase/auth'
import { Ref, ref } from 'vue'

const localUser: Ref<User | null> = ref(null)

export const useAuth = () => {
  const isLoading = ref(false)
  const hasFailed = ref(false)  
  const localError: Ref<unknown> = ref(null)

  return {
    isLoading,
    hasFailed,
    user: localError,
    error: localError
  }
}