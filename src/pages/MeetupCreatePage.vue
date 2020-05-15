<template>
    <div class="meetup-create-page">
        <AppHero />
        <section class="section">
            <div class="container">
                <form>
                    <b-steps
                        v-model="activeStep"
                        animated
                        :has-navigation="false"
                        label-position="bottom"
                        :rounded="false"
                    >
                        <b-step-item step="1" label="Location">
                            <LocationInput @handleSubmit="getStepDate" />
                        </b-step-item>
                        <b-step-item step="2" label="Meetup Details">
                            <MeetupDetail @prev="decStep" @handleSubmit="getStepDate" />
                        </b-step-item>
                        <b-step-item step="3" label="Meetup Description">
                            <MeetupDescriptions @prev="decStep" @handleSubmit="getStepDate" />
                        </b-step-item>
                        <b-step-item step="4" label="Finish">
                            <MeetupConfirmations
                                @prev="decStep"
                                :meetup-data="formData"
                                :disabled-confirm-btn="disabledConfirmBtn"
                            />
                        </b-step-item>
                    </b-steps>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import _ from 'lodash';
import AppHero from '@/components/AppHero';
import LocationInput from '@/components/MeetupCreate/LocationInput';
import MeetupDetail from '@/components/MeetupCreate/MeetupDetail';
import MeetupDescriptions from '@/components/MeetupCreate/MeetupDescriptions';
import MeetupConfirmations from '@/components/MeetupCreate/MeetupConfirmations';

export default {
    name: 'MeetupCreate',
    data() {
        return {
            totalStep: 3,
            activeStep: 0,
            formData: {
                location: null,
                title: null,
                category: null,
                startDate: null,
                timeFrom: null,
                timeTo: null,
                shortInfo: null,
                descriptions: null,
                images: []
            }
        };
    },
    computed: {
        disabledConfirmBtn() {
            const requiredField = _.pick(this.formData, [
                'location',
                'title',
                'category',
                'startDate',
                'timeFrom',
                'timeTo'
            ]);
            return Object.values(requiredField).some(field => !field);
        }
    },
    methods: {
        incStep() {
            this.activeStep++;
        },
        decStep() {
            this.activeStep--;
        },
        getStepDate(data) {
            this.formData = _.assign({}, this.formData, data);
            this.incStep();
        }
    },
    components: {
        AppHero,
        LocationInput,
        MeetupDetail,
        MeetupDescriptions,
        MeetupConfirmations
    },
    created() {
        if (!this.$store.getters.categories) {
            this.$store.dispatch('fetchCategories');
        }
    }
};
</script>
