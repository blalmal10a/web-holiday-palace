import z from "zod"
import type { ColumnDef } from '@tanstack/vue-table'
export function useExpenditure() {
    const store = useExpenditureStore()
    const router = useRouter()
    const route = useRoute()

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
            notifyError(error);
            console.error('Failed to fetch expenditures', error)
            const { $notify } = useNuxtApp()
            $notify.error("Failed to fetch expenditures",)
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
            notifyError(error);
            console.error('Failed to fetch expenditure detail', error)
        }
    }

    const submitForm = async () => {
        store.setLoading('loadingSubmitExpenditureForm', true)
        try {
            let method = store.form.id ? 'PATCH' : 'POST';
            let url = `/expenditures`
            if (store.form.id) {
                url = `/expenditures/${store.form.id}`
            }
            const response = await api.request(url, store.form, method)
            store.setData(response)
            router.push({ name: 'hotels-expenditures' })
        } catch (error) {
            notifyError(error);
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
            notifyError(error);
            console.error('Delete failed', error)
        } finally {
            store.setLoading('loadingDeleteExpenditure', false)
        }
    }

    return {
        data,
        form,
        loadingGetExpenditures,
        loadingSubmitExpenditureForm,
        loadingDeleteExpenditure,
        fetchData,
        fetchDetail,
        submitForm,
        deleteExpenditure
    }
}

export const expenditreFormSchema = () => {
    const baseSchema = z.object({
        id: z.string().optional(),
        date: z.string(),
        phone: z.string().optional().nullable(),
        name: z.string()
            .optional()
            .nullable(),
        item: z.string().min(1),
        rate: z.number().min(1),
        quantity: z.number().min(1),
        amount: z.number().min(1),
        staff_id: z.string().optional(),
    }) satisfies z.ZodType<ExpenditureForm>;

    return baseSchema;
};


export const expenditureColumns: ColumnDef<Expenditure>[] = [
    {
        header: 'Name',
        accessorFn: (row) => (row.staff?.name || row.name) ?? 'N/A',
        // 
    },
    {
        header: 'Item',
        accessorFn: (row) => row.item,
    },
    {
        header: 'Rate',
        cell: ({ row }) => `${toRupees(row.original.rate)}`,
    },
    { header: 'Quantity', accessorKey: 'quantity' },
    { header: 'Amount', cell: ({ row }) => `${toRupees(row.original.amount)}` },
    { id: 'actions' }
]