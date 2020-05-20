<template>
    <section class="section">
        <p
            v-if="disabledConfirmBtn"
            class="has-text-light p-2 rounded text-capitalize text-center mt-5 has-background-danger"
        >
            please check all the required field are full fill
        </p>
        <template v-else>
            <b-menu :accordion="false" :activable="false" class="size-4">
                <b-menu-list label="Confirm Meetup Details" class="size-5">
                    <b-menu-item label="Meetup Title" expanded>
                        <li class="ml-2">{{ meetupData.title }}</li>
                    </b-menu-item>
                    <b-menu-item label="Meetup Location" expanded v-if="meetupData.location">
                        <li class="ml-2 mb-3">Country: {{ meetupData.location.country }}</li>
                        <li class="ml-2 mb-3">City: {{ meetupData.location.city }}</li>
                        <li class="ml-2 mb-3">Address: {{ meetupData.location.address }}</li>
                    </b-menu-item>
                    <b-menu-item label="Start Date" expanded>
                        <li class="ml-2 mb-3">{{ meetupData.startDate | formatTime }}</li>
                    </b-menu-item>
                    <b-menu-item label="Time From" expanded>
                        <li class="ml-2 mb-3">{{ meetupData.timeFrom }}</li>
                    </b-menu-item>
                    <b-menu-item label="Time To" expanded>
                        <li class="ml-2 mb-3">{{ meetupData.timeTo }}</li>
                    </b-menu-item>
                    <b-menu-item label="Category" expanded>
                        <li class="ml-2 mb-3">{{ meetupData.category.name }}</li>
                    </b-menu-item>
                    <b-menu-item label="Meetu Images" expanded>
                        <ImagePreview :files="meetupData.images" :delete-able="false" />
                    </b-menu-item>
                    <b-menu-item label="Short Info" expanded>
                        {{ meetupData.shortInfo }}
                    </b-menu-item>
                    <b-menu-item label="Descriptions" expanded>
                        {{ meetupData.descriptions }}
                    </b-menu-item>
                </b-menu-list>
            </b-menu>
            <div class="d-flex justify-content-end py-4 px-4">
                <b-button
                    type="is-danger"
                    icon-pack="fas"
                    icon-left="backward"
                    @click.prevent="$emit('prev')"
                    class="mr-3"
                >
                    Previous
                </b-button>
                <b-button
                    type="is-success"
                    icon-pack="fas"
                    icon-right="forward"
                    :disabled="disabledConfirmBtn"
                    @click="createNewMeetup"
                    :loading="isSubmiting"
                >
                    Confirm
                </b-button>
            </div>
        </template>
    </section>
</template>

<script>
import ImagePreview from '@/components/ImageUpload/ImagePreview';
export default {
    name: 'MeetupConfirmations',
    data() {
        return {
            isSubmiting: false
        };
    },
    props: {
        meetupData: {
            type: Object,
            required: true
        },
        disabledConfirmBtn: {
            type: Boolean,
            required: true
        }
    },
    components: { ImagePreview },
    methods: {
        async createNewMeetup() {
            this.isSubmiting = true;
            try {
                const { $store, $router, meetupData } = this;
                const meetup = await $store.dispatch('meetups/createMeetup', {
                    ...meetupData,
                    category: meetupData.category.id
                });
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'Meetup Create Successfuly',
                    position: 'is-top',
                    type: 'is-success'
                });
                $router.replace({ name: 'meetupDetailsPage', params: { meetupSlug: meetup.slug } });
            } catch (err) {
                if (Array.isArray(err)) {
                    const some = err.map(el => `<div class="text-right">${el}</div>`);
                    this.$buefy.toast.open({
                        duration: 3000,
                        message: some.join(''),
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                } else {
                    this.$buefy.toast.open({
                        duration: 3000,
                        message: err,
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                }
            } finally {
                this.isSubmiting = false;
            }
        }
    }
};
</script>
