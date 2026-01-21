import z from "zod";
import { uuidv7 } from 'uuidv7'

export const invoiceItem = reactive({
    form: {} as InvoiceItemForm,
    onAddInvoiceItem(form: InvoiceItemForm) {
        const invoiceStore = useInvoiceStore()
        if (!form.id) {
            form.id = uuidv7();
            invoiceStore.form.items.push(form);
        } else {
            let itemIndex = invoiceStore.form.items.findIndex(item => item.id == form.id)
            invoiceStore.form.items[itemIndex] = form;

        }
        invoiceStore.showInvoiceItemFormModal = false;
    }
})

export const invoiceItemFormSchema = () => {
    return z.object({
        id: z.string().optional(),
        invoice_id: z.string(),
        booking_id: z.string().optional().nullable(),
        description: z.string(),
        quantity: z.number(),
        unit: z.string().optional(),
        rate: z.number(),
    }) satisfies z.ZodType<InvoiceItemForm>;
};