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
const menuItemStore = useMenuItemStore();
await menuItem.fetchData();
const menuItemOptions = computed(() => {
    return menuItemStore.data.data.map(mi => mi.name)
})

const imageFiles = ref<File[]>([])
onMounted(async () => {
    if (!props.isModal && !store.form.id && useRoute().params.id != "add") {
        await model.fetchDetail()
    }
})



onBeforeUnmount(() => {

    store.$reset();
})
</script>
<template>
    <div class="flex flex-col items-center">
        <u-card style="max-width: 700px; min-width: min(90vw, 700px);">
            <u-form
                :schema="InvoiceFormSchema()"
                :state="store.form"
                @submit="model.submitForm(imageFiles)"
                class="space-y-4 w-full"
                @error="($event) => console.log($event)"
            >
                <!-- <u-form-field
                    label="Client"
                    name="client_id"
                >
                    <USelectMenu
                        class="w-full"
                        v-model="store.form.invoice_no"
                        value-key="id"
                        label-key="name"
                        :items="userStore.data.data"
                    />
                </u-form-field> -->

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
                <template v-for="(item, index) in store.form.items">
                    <div class="grid grid-cols-6  gap-3">

                        <div class="col-span-full">
                            <USeparator size="lg" />
                        </div>
                        <u-form-field
                            class="col-span-6 md:col-span-2"
                            :name="`items.${index}.description`"
                        >
                            <u-input-menu
                                ref="ItemRef"
                                placeholder="Item"
                                @focus="($event) => {
                                    if ($event.target) {
                                        ($event.target as HTMLInputElement).select();
                                    }
                                }"
                                class="w-full"
                                v-model="item.description"
                                :items="menuItemOptions"
                                create-item
                                @create="($event) => {
                                    item.description = $event;
                                    // $refs.ItemRef.
                                    console.log($event);
                                }"
                            />
                        </u-form-field>
                        <u-form-field
                            class="col-span-3 md:col-span-2"
                            :name="`items.${index}.quantity`"
                        >
                            <u-input
                                placeholder="Quantity"
                                v-model="item.quantity"
                                icon="i-lucide-indian-rupee"
                                type="number"
                            />
                        </u-form-field>
                        <u-form-field
                            class="col-span-3 md:col-span-2"
                            :name="`items.${index}.rate`"
                        >
                            <u-input
                                placeholder="Rate"
                                v-model="item.rate"
                                icon="i-lucide-indian-rupee"
                                type="number"
                            />
                        </u-form-field>
                    </div>
                </template>
                <div>
                    <u-button
                        @click="() => {
                            store.form.items.push({} as InvoiceItemForm)
                        }"
                        label="Add item"
                        icon="i-lucide-plus"
                    ></u-button>
                </div>
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
            </u-form>
        </u-card>

    </div>
</template>

<style scoped>
.relative.inline-flex.items-center {
    width: 100%;
}
</style>
