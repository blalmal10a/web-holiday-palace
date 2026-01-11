<script setup lang="ts">
const store = useInvoiceStore();
</script>
<template>
    <UModal
        v-model:open="store.showInvoiceItemFormModal"
        @after:leave="() => {
            invoiceItem.form = {} as InvoiceItemForm;
        }"
    >
        <template #title>
            Invoice item
        </template>
        <template
            #body
            aria-describedby="Invoice item form"
        >
            <FormsInvoiceItemForm />
        </template>
    </UModal>
</template>