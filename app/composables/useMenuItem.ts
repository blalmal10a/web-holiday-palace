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
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/menu-items`
            if (store.form.id) {
                url = `/menu-items/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)
            router.push({ name: 'hotels-menu-items' })
        } catch (error) {
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitMenuItemForm', false)
        }
    }

    const deleteMenuItem = async (id: string) => {
        store.setLoading('loadingDeleteMenuItem', true)
        try {
            const response = await api.delete(`/menu-items/${id}`)
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

export const menuItemFormSchema = () => {
    const baseSchema = z.object({
        name: z.string().min(3),
        rate: z.number().min(1),
        unit: z.string(),
    })

    return baseSchema;
}

// 2. Export Columns (Used in Table components)
export const menuItemColumns: ColumnDef<MenuItem>[] = [
    { header: 'Item', accessorKey: 'name' },
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
export const menuItemUnitsList = [
    {
        value: 'plate',
        label: 'Plate',
    },
    {
        value: 'cup',
        label: 'Cup',
    },
    {
        value: 'bowl',
        label: 'Bowl',
    },
    {
        value: 'box',
        label: 'Box',
    },
    {
        value: 'piece',
        label: 'Piece',
    },
    {
        value: 'bottle',
        label: 'Bottle',
    }
]