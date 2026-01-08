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
            console.error('Failed to fetch room detail', error)
        }
    }
    const submitForm = async () => {
        store.setLoading('loadingSubmitRoomForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/rooms`
            if (store.form.id) {
                url = `/rooms/${store.form.id}`
            }
            const response = await api.request(url, store.form, method,)
            store.setData(response)
            router.push({ name: 'hotels-rooms' })
        } catch (error) {
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
        name: z.string().min(1),
        rate: z.number().min(1),
        staff_id: z.string(),
    })
    return baseSchema;
}

// 2. Export Columns (Used in Table components)
export const roomColumns: ColumnDef<any>[] = [
    { header: 'Room no.', accessorKey: 'name' },
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