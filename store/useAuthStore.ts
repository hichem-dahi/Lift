import { defineStore } from "pinia"
import type { Session } from "@supabase/supabase-js"

import type { User } from "~/models/User"

export const useAuthStore = defineStore('authStore', () => {
  const avatar = ref()
  const session = ref<Session>()
  const user = ref<User>()

  return { user, session, avatar }
})


