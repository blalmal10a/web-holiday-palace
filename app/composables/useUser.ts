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
            const response = await api.get('/users', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            notifyError(error);
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
            store.detail = response as UserDetail;
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch user detail', error)
        }
    }

    const submitForm = async () => {
        store.setLoading('loadingSubmitUserForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/users`
            if (store.form.id) {
                url = `/users/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)
            router.push({ name: 'index' })
        } catch (error) {
            notifyError(error);
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitUserForm', false)
        }
    }

    const deleteUser = async (id: string) => {
        store.setLoading('loadingDeleteUser', true)
        try {
            const response = await api.delete(`/users/${id}`)
            store.setData(response)
        } catch (error) {
            notifyError(error);
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

export const userFormSchema = (updatePassword: boolean) => {
    const baseSchema = z.object({
        name: z.string().min(3),
        email: z.email().optional(),
        phone: z.string(),
        password: z.string(),
        password_confirmation: z.string()
    }) satisfies z.ZodType<UserForm>

    if (updatePassword) {
        return baseSchema.extend({
            password: z.string().min(4),
            password_confirmation: z.string().min(4),
        }).refine((data) => {
            return data.password === data.password_confirmation;
        }, {
            message: "Passwords do not match",
            path: ["password_confirmation"]
        });
    }

    return baseSchema;
};


// 2. Export Columns (Used in Table components)
export const userColumns: ColumnDef<any>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Phone', accessorKey: 'phone' },
    { id: 'actions' }
]