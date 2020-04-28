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
                <div class="row columns is-multiline">
                    <MeetupItem
                        v-for="meetup in meetups"
                        :key="meetup.id"
                        :meetup="meetup"
                    />
                </div>
            </section>
            <section class="section">
                <div>
                    <h1 class="title">
                        Categories
                    </h1>
                    <div class="columns cover is-multiline is-mobile">
                        <CategoryItem
                            v-for="category in categories"
                            :key="category.id"
                            :category="category"
                        />
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
import axios from 'axios';

export default {
    name: 'App',
    components: { AppHero, AppDropDown, CategoryItem, MeetupItem },
    data() {
        return {
            categories: [],
            meetups: []
        };
    },
    methods: {
        async fetchMeetup() {
            const res = await axios.get('/api/v1/meetups');
            this.meetups = res.data;
        },
        async fetchCategories() {
            const res = await axios.get('/api/v1/categories');
            this.categories = res.data;
        }
    },
    async created() {
        this.fetchMeetup();
        this.fetchCategories();
    }
};
</script>

<style scoped></style>
