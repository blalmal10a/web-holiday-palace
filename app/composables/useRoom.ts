import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useRoom() {
    const store = useRoomStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetRooms, loadingSubmitRoomForm, loadingDeleteRoom } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetRooms', true)
        try {
            const response = await api.get('/rooms', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch rooms', error)
        } finally {
            store.setLoading('loadingGetRooms', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const roomId = id || route.params.id as string
        try {
            const response = await api.get(`/rooms/${roomId}`)
            store.setForm(response)
        } catch (error) {
            notifyError(error);
            console.error('Failed to fetch room detail', error)
        }
    }
    const submitForm = async (imageFiles: File[]) => {
        store.setLoading('loadingSubmitRoomForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/rooms`
            if (store.form.id) {
                url = `/rooms/${store.form.id}`
            }
            store.form.image_files = imageFiles;
            const response = await api.request(url, store.form, method,)
            store.setData(response)
            router.push({ name: 'hotels-rooms' })
        } catch (error) {
            notifyError(error);
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitRoomForm', false)
        }
    }

    const deleteRoom = async (id: string) => {
        store.setLoading('loadingDeleteRoom', true)
        try {
            const response = await api.delete(`/rooms/${id}`)
            store.setData(response)
        } catch (error) {
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteRoom', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetRooms,
        loadingSubmitRoomForm,
        loadingDeleteRoom,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteRoom
    }
}

export const roomFormSchema = () => {
    const baseSchema = z.object({
        id: z.string().optional(),
        number: z.string(),
        rate: z.number().min(1),
        description: z.string(),
        is_ac: z.boolean(),
        is_dormatory: z.boolean(),
        capacity: z.number().optional(),
        max_capacity: z.number().optional(),
        double_bed_count: z.number(),
        single_bed_count: z.number(),
        staff_id: z.string(),
        images: z.array(z.object({
            id: z.string(),
            path: z.string(),
            url: z.string(),
        })),
        deleted_image_ids: z.array(z.string()).optional(),
        image_files: z.array(z.instanceof(File)).optional(),
    }) satisfies z.ZodType<RoomForm>
    return baseSchema;
}

// 2. Export Columns (Used in Table components)
export const roomColumns: ColumnDef<any>[] = [
    { header: 'Room no.', accessorKey: 'number' },
    { header: 'Description', accessorKey: 'description' },
    {
        header: 'Staff',
        accessorFn: (row) => row.staff?.name ?? 'N/A',
        // 
    },
    {
        header: 'Rate',
        cell: ({ row }) => `${toRupees(row.original.rate)}`,
    },
    { id: 'actions' }
]