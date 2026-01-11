import z from "zod";

// export const useInvoiceItem = () => {
//     const form = ref<InvoiceItemForm>();
//     const invoiceStore = useInvoiceStore();
//     function onAddInvoiceItem() {
//         invoiceStore.form.items.push(form.value!);
//         invoiceStore.showInvoiceItemFormModal = false;
//     }
//     return {
//         form,
//         onAddInvoiceItem,
//     }
// }
export const invoiceItem = reactive({
    form: {} as InvoiceItemForm,
    onAddInvoiceItem(form: InvoiceItemForm) {
        const invoiceStore = useInvoiceStore()
        invoiceStore.form.items.push(form);
        invoiceStore.showInvoiceItemFormModal = false;
    }
})

export const invoiceItemFormSchema = () => {
    return z.object({
        id: z.string().optional(),
        invoice_id: z.string(),
        booking_id: z.string(),
        description: z.string(),
        quantity: z.number(),
        unit: z.string().optional(),
        rate: z.number(),
    }) satisfies z.ZodType<InvoiceItemForm>;
};