<script setup lang="ts">
const carouselItems = [
    "/assets/images/website/welcome-tiles.jpg",
    "/assets/images/website/basketball-court.jpg",
    // "/assets/images/website/children-park.jpg",
    "/assets/images/website/dining-hall.jpg",
    "/assets/images/website/left-angle.jpg",
    "/assets/images/website/right-angle.jpg",
    "/assets/images/website/tree-house.jpg",
]
const another = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1920',
]
</script>
<template>

    <section class="relative h-screen overflow-hidden">
        <UCarousel
            v-slot="{ item }"
            :items="carouselItems"
            :ui="{ item: 'basis-full' }"
            class="h-full"
            indicators
            loop
        >
            <div class="relative w-full h-screen">
                <NuxtImg
                    :src="item"
                    class="absolute inset-0 w-full h-full object-cover"
                    alt="Hero Image"
                    loading="lazy"
                />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
                    <div class="max-w-3xl space-y-6 animate-in fade-in zoom-in duration-700">
                        <!-- <h1 class="text-5xl md:text-7xl font-serif text-white font-bold">{{ item.title }}</h1>
                        <p class="text-xl md:text-2xl text-white/90 font-light">{{ item.description }}</p> -->
                        <div class="flex justify-center gap-4 pt-4">
                            <UButton
                                size="xl"
                                color="primary"
                                label="Explore Suites"
                                to="#rooms"
                            />
                            <UButton
                                size="xl"
                                variant="outline"
                                class="text-white border-white hover:bg-white/20"
                                label="Virtual Tour"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </UCarousel>
    </section>
</template>