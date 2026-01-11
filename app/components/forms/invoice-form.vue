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
const imageFiles = ref<File[]>([])
const loadingInvoiceItems = ref<boolean>(false);
onMounted(async () => {
    menuItem.fetchData();
    if (!store.form.items?.length && useRoute().params.id != "add") {
        try {
            loadingInvoiceItems.value = true;
            await model.fetchDetail(store.form.id)
        } catch (error) {

        } finally {
            loadingInvoiceItems.value = false;
        }
    }
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
            <UCard style="max-width: 700px; min-width: min(85vw, 700px); overflow: auto;">
                <InvoicesItemList v-if="!loadingInvoiceItems" />
            </UCard>
            <UCard style="max-width: 700px; min-width: min(85vw, 700px); overflow: auto;">
                <PaymentItemList v-if="!loadingInvoiceItems" />
            </UCard>
            <UCard style="max-width: 700px; min-width: min(90vw, 700px);">

                <div class="flex justify-end space-x-2">
                    <u-button
                        size="lg"
                        variant="outline"
                        color="neutral"
                        class="h-full"
                        :disabled="store.loadingSubmitInvoiceForm"
                        @click="
                            () => {
                                useInvoiceStore().showInvoiceFormModal = false;
                            }
                        "
                    >
                        Cancel
                    </u-button>
                    <u-button
                        size="lg"
                        :loading="store.loadingSubmitInvoiceForm"
                        class=""
                        type="submit"
                    >
                        Submit
                    </u-button>
                </div>
            </UCard>
        </div>
    </u-form>
    <InvoicesItemFormModal />
    <InvoicesPaymentFormModal />
</template>

<style scoped>
.relative.inline-flex.items-center {
    width: 100%;
}
</style>
