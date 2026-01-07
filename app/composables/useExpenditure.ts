import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useExpenditure() {
    const store = useExpenditureStore()
    const router = useRouter()
    const route = useRoute()

    // storeToRefs allows us to destructure state while keeping reactivity
    const { data, form, loadingGetExpenditures, loadingSubmitExpenditureForm, loadingDeleteExpenditure } = storeToRefs(store)

    const fetchData = async () => {
        store.setLoading('loadingGetExpenditures', true)
        try {
            const response = await api.get('/expenditures', {
                params: {
                    ...store.pagination
                }
            })
            store.setData(response)
        } catch (error) {
            console.error('Failed to fetch expenditures', error)
        } finally {
            store.setLoading('loadingGetExpenditures', false)
        }
    }

    const fetchDetail = async (id?: string) => {
        const expenditureId = id || route.params.id as string
        try {
            const response = await api.get(`/expenditures/${expenditureId}`)
            store.setForm(response)
        } catch (error) {
            console.error('Failed to fetch expenditure detail', error)
        }
    }

    const submitForm = async () => {
        store.setLoading('loadingSubmitExpenditureForm', true)
        try {
            const response = await api.patch(`/expenditures/${store.form.id}`, store.form)
            store.setData(response)
            router.push({ name: 'index' })
        } catch (error) {
            console.error('Submission failed', error)
        } finally {
            store.setLoading('loadingSubmitExpenditureForm', false)
        }
    }

    const deleteExpenditure = async (id: string) => {
        store.setLoading('loadingDeleteExpenditure', true)
        try {
            const response = await api.delete(`/expenditures/${id}`)
            store.setData(response)
        } catch (error) {
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteExpenditure', false)
        }
    }

    return {
        // State
        data,
        form,
        loadingGetExpenditures,
        loadingSubmitExpenditureForm,
        loadingDeleteExpenditure,
        // Actions
        fetchData,
        fetchDetail,
        submitForm,
        deleteExpenditure
    }
}

export const expenditureFormSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4),
    password_confirmation: z.string().min(4),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"]
})

// 2. Export Columns (Used in Table components)
export const expenditureColumns: ColumnDef<any>[] = [
    { header: 'Expenditure no.', accessorKey: 'name' },
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