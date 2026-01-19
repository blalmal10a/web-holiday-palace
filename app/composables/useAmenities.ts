import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useAmenity() {
    const store = useAmenityStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetAmenities, loadingSubmitAmenityForm, loadingDeleteAmenity } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetAmenities', true)
        try {
            const response = await api.get('/amenities', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch amenities', error)
        } finally {
            store.setLoading('loadingGetAmenities', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const AmenityId = id || route.params.id as string
        try {
            const response = await api.get(`/amenities/${AmenityId}`)
            store.setForm(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch Amenity detail', error)
        }
    }

    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitAmenityForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/amenities`
            if (store.form.id) {
                url = `/amenities/${store.form.id}`
            }

            const response = await api.request(url, {
                ...store.form,
                image_files: imageFiles
            }, method,)
            store.$reset();
            store.setData(response)

            router.push({ name: 'hotels-amenities' })
        } catch (error) {
            notifyError(error);
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitAmenityForm', false)
        }
    }

    const deleteAmenity = async (id: string) => {
        store.setLoading('loadingDeleteAmenity', true)
        try {
            const response = await api.delete(`/amenities/${id}`)
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteAmenity', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetAmenities,
        loadingSubmitAmenityForm,
        loadingDeleteAmenity,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteAmenity
    }
}

export const AmenityFormSchema = () => {
    const baseSchema = z.object({
        name: z.string().min(3),
        rate: z.number().min(1),
        unit: z.string(),
        description: z.string().optional().nullable(),
        category: z.string(),
        images: z.array(z.object({
            id: z.string(),
            path: z.string(),
            url: z.string(),
        })).optional(),
        deleted_image_ids: z.array(z.string()).optional(),
        image_files: z.array(z.instanceof(File)).optional(),
    }) satisfies z.ZodType<AmenityForm>

    return baseSchema;
}

// 2. Export Columns (Used in Table components)
export const AmenityColumns: ColumnDef<Amenity>[] = [
    { header: 'Item', accessorKey: 'name' },
    {
        header: 'Rate',
        cell: ({ row }) => `${toRupees(row.original.rate)}`,
    },
    {
        header: 'Unit',
        accessorFn: (row) => AmenityUnits[row.unit] ?? 'N/A',
    },
    { id: 'actions' }
]

export const AmenityUnits: Record<string, string> = {
    'plate': 'Plate',
    'cup': 'Cup',
    'bowl': 'Bowl',
    'box': 'Box',
    'piece': 'Piece',
    'bottle': 'Bottle',
}
export const AmenityUnitsList = [
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