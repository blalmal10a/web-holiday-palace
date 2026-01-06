import { defineStore } from 'pinia'
import z from "zod"

export const useAuth = defineStore('auth', {
  state: () => ({
    user: useSanctumUser<User>(),
  }),
  actions: {
    updateUser(user: User) {
      this.user = user;
    }
  }
})

export const auth = reactive({
  loadingSubmitLogin: false,
  loadingSubmitUpdateProfile: false,
  form: {
    name: '',
    email: 'admin@example.email',
    password: 'admin@example.email',
    password_confirmation: '',
    remember: false,
  },
  login,
  onSubmitUpdateProfile,
  resetForm() {
    for (const prop in this.form) {
      delete this.form[prop as keyof typeof this.form];
    }
  }
})
export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
  remember: z.boolean().default(false),
})

export const UpdateProfileSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(4),
  password_confirmation: z.string().min(4),
})
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
  })

async function login() {
  try {
    auth.loadingSubmitLogin = true;
    const { login } = useSanctumAuth()
    await login(auth.form);
  } catch (error) {
    notifyError(error);
  } finally {
    auth.loadingSubmitLogin = false;
  }
}

async function onSubmitUpdateProfile() {
  try {
    auth.loadingSubmitUpdateProfile = true;
    const user = await api.post<User>('update-profile', auth.form);

    await useSanctumAuth().refreshIdentity()
    // notify.success("Profile updated successfully");

  } catch (error) {
    notifyError(error);
  } finally {
    auth.loadingSubmitUpdateProfile = false;
  }
}