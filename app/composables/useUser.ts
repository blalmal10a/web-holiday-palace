import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useUser() {
    const store = useUserStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetUsers, loadingSubmitUserForm, loadingDeleteUser } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetUsers', true)
        try {
            const response = await api.get('/users')
            store.setUsers(response)
        } catch (error) {
            console.error('Failed to fetch users', error)
        } finally {
            store.setLoading('loadingGetUsers', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const userId = id || route.params.id as string
        try {
            const response = await api.get(`/users/${userId}`)
            store.setForm(response)
        } catch (error) {
            console.error('Failed to fetch user detail', error)
        }
    }

    const submitForm = async () => {
        store.setLoading('loadingSubmitUserForm', true)
        try {
            const response = await api.patch(`/users/${store.form.id}`, store.form)
            store.setUsers(response)
            router.push({ name: 'index' })
        } catch (error) {
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitUserForm', false)
        }
    }

    const deleteUser = async (id: string) => {
        store.setLoading('loadingDeleteUser', true)
        try {
            const response = await api.delete(`/users/${id}`)
            store.setUsers(response)
        } catch (error) {
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteUser', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetUsers,
        loadingSubmitUserForm,
        loadingDeleteUser,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteUser
    }
}

export const userFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    password_confirmation: z.string().min(4),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
})

// 2. Export Columns (Used in Table components)
export const userColumns: ColumnDef<any>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { id: 'actions' }
]