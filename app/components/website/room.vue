<script setup lang="ts">
const props = defineProps({
    rooms: {
        default: [] as Room[],

    }
})
</script>
<template>
    <section
        id="rooms"
        class="py-24 max-w-7xl mx-auto px-4"
    >
        <div class="text-center mb-16 space-y-4">
            <h2 class="text-4xl font-serif font-bold text-neutral-900 dark:text-white">World-Class Accommodations
            </h2>
            <p class="text-neutral-500 max-w-2xl mx-auto italic text-lg">Every room is a masterpiece of design and
                comfort.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <UCard
                v-for="room in props.rooms"
                :key="room.name"
                class="overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-300 ring-1 ring-neutral-200 dark:ring-neutral-800 flex flex-col"
                :ui="{
                    body: 'flex-1',
                }"
            >
                <div
                    v-if="room.id"
                    class=" flex flex-col h-full"
                >
                    <div class="flex-1 ">
                        <div class="relative overflow-hidden">
                            <NuxtImg
                                v-if="room.images[0]"
                                :src="room.images[0].url"
                                class="rounded-xl w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt="Room image"
                            />
                            <NuxtImg
                                v-if="!room.images[0]"
                                src="/assets/images/hotel-room-placeholder.svg"
                                class="rounded-xl w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt="Room image"
                            />
                            <div
                                class="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                From {{ room.rate }} / Night
                            </div>
                        </div>

                        <div class="p-6 space-y-3">
                            <h3 class="text-xl font-bold">{{ room.name }}</h3>
                            <!-- <p class="text-sm text-neutral-500 leading-relaxed">{{ room.description }}</p> -->
                            <!-- <div class="flex flex-wrap gap-2 pt-2">
                                <UBadge
                                    v-for="feat in room.features"
                                    :key="feat"
                                    variant="subtle"
                                    color="neutral"
                                    size="sm"
                                >
                                    {{ feat }}
                                </UBadge>
                            </div> -->
                        </div>
                    </div>
                </div>
                <template #footer>
                    <UButton
                        block
                        label="Check Availability"
                        trailing-icon="i-heroicons-arrow-right"
                    />
                </template>
            </UCard>
        </div>
    </section>
</template>