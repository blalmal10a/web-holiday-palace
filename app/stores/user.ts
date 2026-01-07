import { defineStore } from 'pinia'
import type { ColumnDef } from '@tanstack/vue-table'
export const useUserStore = defineStore('user', {
  state: () => ({
    loadingGetUsers: false,
    data: {} as PaginationUser,
  }),
  actions: {
    getUsers,
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

export const userColumns: ColumnDef<User>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
]