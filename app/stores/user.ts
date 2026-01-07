import { defineStore } from 'pinia'
import type { ColumnDef } from '@tanstack/vue-table'
import z from 'zod';
export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    loadingSubmitUserForm: false,
    loadingDeleteUser: false,
    data: {} as PaginationUser,
    form: {} as UserForm,
  }),
  actions: {
    getUsers,
    getDetail,
    submitUserForm,
    confirmDeleteUser,
  }
})

async function getUsers(props: any, toast: any) {
  try {
    useUserStore().loadingGetUsers = true;
    const data = await api.get('/users');

    useUserStore().data = data;
  } catch (error) {
    // 
  } finally {
    useUserStore().loadingGetUsers = false;
  }
}

async function getDetail() {
  try {
    const data = await api.get('/users/' + useRoute().params.id);
    useUserStore().form = data;
  } catch (error) {
    console.log('error: ', error)
  }
}

async function submitUserForm() {
  try {
    useUserStore().loadingSubmitUserForm = true;
    const form = useUserStore().form;
    const data = await api.patch(`/users/${form.id}`, form)
    useUserStore().data = data;
    useRouter().push({
      name: 'index',
    })
  } catch (error) {
    // 
  } finally {
    useUserStore().loadingSubmitUserForm = false;
  }
}

async function confirmDeleteUser() {
  try {
    useUserStore().loadingDeleteUser = true;
    const data = await api.delete(`/users/${useRoute().params.id}`);
  } catch (error) {
    // 
  } finally {
    useUserStore().loadingDeleteUser = false;
  }
}


export const userColumns: ColumnDef<User>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    id: 'actions',
  }
]

export const userFormSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(4),
  password_confirmation: z.string().min(4),
})
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
  })

