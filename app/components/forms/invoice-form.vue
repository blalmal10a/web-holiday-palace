<script lang="ts" setup>
const props = defineProps({
    isModal: {
        type: Boolean,
        default: false
    }
})
const store = useInvoiceStore()
const model = useInvoice()

const menuItem = useMenuItem();
await menuItem.fetchData();
const imageFiles = ref<File[]>([])

onMounted(async () => {
    if (!props.isModal && !store.form.id && useRoute().params.id != "add") {
        await model.fetchDetail()
    }
    store.form.items.forEach(item => {
        if (!item.booking_id) {
            item.booking_id = store.form.booking_id
        }

    });
})



onBeforeUnmount(() => {
    store.$reset();
})
</script>
<template>
    <u-form
        :schema="InvoiceFormSchema()"
        :state="store.form"
        @submit="model.submitForm(imageFiles)"
        class="space-y-4 w-full"
        @error="($event: any) => console.log($event)"
    >
        <div class="flex flex-col items-center space-y-4">
            <u-card style="max-width: 700px; min-width: min(90vw, 700px);">
                <USeparator label="Invoice" />
                <u-form-field
                    label="Date"
                    name="date"
                >
                    <u-input
                        v-model="store.form.date"
                        icon="i-lucide-calendar"
                        type="date"
                    />
                </u-form-field>

                <u-form-field
                    label="Discount amount"
                    name="discount_amount"
                >
                    <u-input
                        v-model="store.form.discount_amount"
                        icon="i-lucide-indian-rupee"
                        type="number"
                    />
                </u-form-field>

            </u-card>
            <UCard style="max-width: 700px; min-width: min(90vw, 700px);">

                <InvoicesItemList />

            </UCard>
            <UCard style="max-width: 700px; min-width: min(90vw, 700px);">

                <div class="text-right space-x-2">
                    <u-button
                        variant="outline"
                        color="neutral"
                        :loading="auth.loadingSubmitUpdateProfile"
                        class=""
                        @click="
                            () => {
                                useRouter().push({
                                    name: 'hotels-invoices',
                                })
                            }
                        "
                    >
                        Cancel
                    </u-button>
                    <u-button
                        :loading="auth.loadingSubmitUpdateProfile"
                        class=""
                        type="submit"
                    >
                        Submit
                    </u-button>
                </div>
            </UCard>
        </div>
    </u-form>
    <UModal
        v-model:open="store.showInvoiceItemFormModal"
        @after:leave="() => {
            // reset form
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

<style scoped>
.relative.inline-flex.items-center {
    width: 100%;
}
</style>
