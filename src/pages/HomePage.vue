<template>
    <div>
        <AppHero />
        <div class="container">
            <section class="section">
                <div class="mb-5 columns flex-wrap">
                    <h1 class="title is-inline column is-12 is-7-desktop">
                        Featured Meetups in "Location"
                    </h1>
                    <div class="column">
                        <AppDropDown />
                        <button class="button is-primary mr-2 is-pulled-right">
                            Create Meetups
                        </button>
                        <button class="button is-primary  mr-2 is-pulled-right">
                            All
                        </button>
                    </div>
                </div>
                <div v-if="meetups" class="row columns is-multiline">
                    <MeetupItem
                        v-for="meetup in meetups"
                        :key="meetup.id"
                        :meetup="meetup"
                    />
                </div>
                <div
                    v-else
                    class="spiner-container d-flex justify-content-center align-items-center"
                >
                    <Spiner />
                </div>
            </section>
            <section class="section">
                <div>
                    <h1 class="title">
                        Categories
                    </h1>
                    <div
                        v-if="categories"
                        class="columns cover is-multiline is-mobile"
                    >
                        <CategoryItem
                            v-for="category in categories"
                            :key="category.id"
                            :category="category"
                        />
                    </div>

                    <div
                        v-else
                        class="spiner-container d-flex justify-content-center align-items-center"
                    >
                        <Spiner />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import AppHero from '@/components/AppHero';
import AppDropDown from '@/components/AppDropdown';
import CategoryItem from '@/components/CategoryItem';
import MeetupItem from '@/components/MeetupItem';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'App',
    computed: mapGetters({
        meetups: 'meetups/meetups',
        categories: 'categories'
    }),
    methods: mapActions({
        fetchMeetups: 'meetups/fetchMeetups',
        fetchCategories: 'fetchCategories'
        // fetchThreads: 'fetchThreads'
    }),
    components: { AppHero, AppDropDown, CategoryItem, MeetupItem },
    async created() {
        // console.log(this.fetchThreads);
        this.fetchMeetups();
        this.fetchCategories();
    }
};
</script>

<style scoped>
.spiner-container {
    min-height: 200px;
}
</style>
