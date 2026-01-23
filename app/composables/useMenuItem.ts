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
            notifyError(error);
            console.error('Failed to fetch menu items', error)
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
            notifyError(error);
            console.error('Failed to fetch menuItem detail', error)
        }
    }

    const fetchMenuItemCategories = async () => {
        try {
            const data = await api.get('menu-item-categories');
            store.categories = data;
        } catch (error) {

        }
    }

    const fetchMenuItemUnits = async () => {
        try {
            const data = await api.get('menu-item-units');
            store.categories = data;
        } catch (error) {

        }
    }

    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitMenuItemForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/menu-items`
            if (store.form.id) {
                url = `/menu-items/${store.form.id}`
            }

            const response = await api.request(url, {
                ...store.form,
                image_files: imageFiles
            }, method,)
            store.$reset();
            store.setData(response)

            router.push({ name: 'hotels-menu-items' })
        } catch (error) {
            notifyError(error);
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
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteMenuItem', false)
        }
    }

    // 

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
        deleteMenuItem,
        fetchMenuItemCategories,
        fetchMenuItemUnits
    }
}

export const menuItemFormSchema = () => {
    const baseSchema = z.object({
        name: z.string().min(3),
        rate: z.number().min(1),
        unit: z.string(),
        description: z.string().optional().nullable(),
        category: z.string(),
        images: z.array(z.object({
            id: z.string(),
            path: z.string().nullable(),
            url: z.string(),
        })).optional(),
        deleted_image_ids: z.array(z.string()).optional(),
        image_files: z.array(z.instanceof(File)).optional(),
    }) satisfies z.ZodType<MenuItemForm>

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
        accessorFn: (row) => {
            // return useMenuItemStore().units[row.unit] ?? 'N/A';
        },
    },
    { id: 'actions' }
]
