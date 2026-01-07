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
            const response = await api.get('/rooms')
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
            const response = await api.patch(`/rooms/${store.form.id}`, store.form)
            store.setData(response)
            router.push({ name: 'index' })
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

export const roomFormSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4),
    password_confirmation: z.string().min(4),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
})

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