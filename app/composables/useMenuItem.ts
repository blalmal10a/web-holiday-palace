import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useMenuItem() {
    const store = useMenuItemStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetMenuItems, loadingSubmitMenuItemForm, loadingDeleteMenuItem } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetMenuItems', true)
        try {
            const response = await api.get('/menu-items', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            console.error('Failed to fetch menuItems', error)
        } finally {
            store.setLoading('loadingGetMenuItems', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const menuItemId = id || route.params.id as string
        try {
            const response = await api.get(`/menu-items/${menuItemId}`)
            store.setForm(response)
        } catch (error) {
            console.error('Failed to fetch menuItem detail', error)
        }
    }

    const submitForm = async () => {
        store.setLoading('loadingSubmitMenuItemForm', true)
        try {
            const response = await api.patch(`/menuItems/${store.form.id}`, store.form)
            store.setData(response)
            router.push({ name: 'index' })
        } catch (error) {
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitMenuItemForm', false)
        }
    }

    const deleteMenuItem = async (id: string) => {
        store.setLoading('loadingDeleteMenuItem', true)
        try {
            const response = await api.delete(`/menuItems/${id}`)
            store.setData(response)
        } catch (error) {
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteMenuItem', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetMenuItems,
        loadingSubmitMenuItemForm,
        loadingDeleteMenuItem,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteMenuItem
    }
}

export const menuItemFormSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4),
    password_confirmation: z.string().min(4),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
})

// 2. Export Columns (Used in Table components)
export const menuItemColumns: ColumnDef<MenuItem>[] = [
    { header: 'Menu', accessorKey: 'name' },
    {
        header: 'Rate',
        cell: ({ row }) => `${toRupees(row.original.rate)}`,
    },
    {
        header: 'Unit',
        accessorFn: (row) => menuItemUnits[row.unit] ?? 'N/A',
    },
    { id: 'actions' }
]

export const menuItemUnits: Record<string, string> = {
    'plate': 'Plate',
    'cup': 'Cup',
    'bowl': 'Bowl',
    'box': 'Box',
    'piece': 'Piece',
    'bottle': 'Bottle',
}
