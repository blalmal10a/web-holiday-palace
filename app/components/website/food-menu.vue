<script setup lang="ts">
const menuCategories = [
    {
        label: 'Starters',
        items: [
            { name: 'Truffle Arancini', price: '$18', desc: 'Crispy risotto balls with truffle oil and parmesan.' },
            { name: 'Seared Scallops', price: '$24', desc: 'Hokkaido scallops with pea puree and pancetta.' }
        ]
    },
    {
        label: 'Main Course',
        items: [
            { name: 'Wagyu Ribeye', price: '$65', desc: 'Grade A5 wagyu served with roasted bone marrow.' },
            { name: 'Lobster Thermidor', price: '$58', desc: 'Atlantic lobster in a rich brandy cream sauce.' }
        ]
    },
    {
        label: 'Desserts',
        items: [
            { name: 'Gold Leaf Fondant', price: '$16', desc: 'Dark chocolate lava cake with edible 24k gold.' },
            { name: 'Lemon Yuzu Tart', price: '$14', desc: 'Zesty yuzu curd with toasted swiss meringue.' }
        ]
    }
]
const menuItem = useMenuItem();
const menuItemStore = useMenuItemStore();
// menuItemStore.pagination.pageSize = Number.MAX_SAFE_INTEGER
menuItemStore.pagination.pageSize = 50
await menuItem.fetchData()
</script>
<template>
    <section
        id="dining"
        class="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col gap-12 lg:gap-16">
                <!-- Header Section -->
                <div class="space-y-4 max-w-3xl">
                    <span class="text-primary-600 font-bold uppercase tracking-[0.2em] text-xs">
                        Fine Dining
                    </span>
                    <h2
                        class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 dark:text-neutral-100">
                        The Palace Kitchen
                    </h2>
                    <p class="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
                        Embark on a culinary journey where every dish tells a story of tradition and innovation.
                        Our Michelin-starred restaurant offers a curated menu of seasonal delights.
                    </p>
                </div>

                <!-- Menu Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    <div
                        v-for="item in menuItemStore.data.data"
                        :key="item.name"
                        class="group flex flex-col"
                    >
                        <!-- Square Image Container -->
                        <div
                            class="relative w-full overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-800 aspect-square mb-4">
                            <UCarousel
                                autoplay
                                v-if="item.images && item.images.length > 0"
                                :items="item.images"
                                :ui="{
                                    root: 'bg-red-200',
                                    viewport: 'bg-green-700  h-full',
                                    container: 'bg-yellow-700  h-full',
                                    item: 'h-full bg-blue-200 ',
                                    // 
                                }"
                                class="w-full h-full"
                            >
                                <template #default="{ item: image }">
                                    <div class="h-full w-full bg-red-200">
                                        <img
                                            :src="image.url"
                                            :alt="item.name"
                                            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 "
                                            draggable="false"
                                        />
                                    </div>
                                </template>
                            </UCarousel>

                            <img
                                v-else
                                src="/assets/images/food-placeholder.png"
                                alt="Food placeholder"
                                class="w-full h-full object-cover opacity-80"
                            />
                        </div>

                        <!-- Item Details -->
                        <div class="flex justify-between items-baseline gap-4">
                            <h3
                                class="font-serif text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 flex-1">
                                {{ item.name }}
                            </h3>
                            <span class="font-bold text-lg text-primary-600 whitespace-nowrap">
                                {{ item.rate }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="pt-4">
                    <UButton
                        label="Explore Full Menu"
                        variant="outline"
                        color="primary"
                        size="xl"
                        trailing-icon="i-heroicons-arrow-right"
                        class="rounded-full px-8 hover:bg-primary-600 hover:text-white transition-all"
                    />
                </div>
            </div>
        </div>
    </section>
</template>