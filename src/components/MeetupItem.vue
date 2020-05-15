<template>
    <router-link
        :to="{ name: 'meetupDetails', params: { id: meetup.id } }"
        class="column is-one-third"
    >
        <div class="card large">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="meetup.images[0] | buildImagePath" :alt="meetup.title" />
                </figure>
            </div>
            <div class="card-content">
                <div class="level mb-3">
                    <div class="media-left">
                        <div class="level-item has-text-centered">
                            <div>
                                <p class="title">
                                    {{ meetup.startDate | formatTime('MMM') }}
                                </p>
                                <p class="title">
                                    {{ meetup.startDate | formatTime('D') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="media-content">
                        <p class="title is-4 no-padding is-marginless">
                            {{ meetup.title }}
                        </p>
                        <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                        <span class="tag is-success">
                            {{ meetup.category.name }}
                        </span>
                        <p class="subtitle is-7">
                            {{ meetup.location.address }}, {{ meetup.location.city }},
                            {{ meetup.location.country }}
                        </p>
                    </div>
                </div>
                <div class="content">
                    {{ meetupDescriptions }}
                    <div class="background-icon">
                        <span class="icon-twitter" />
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'MeetupItem',
    props: {
        meetup: {
            type: Object,
            required: true
        }
    },
    computed: {
        meetupDescriptions() {
            return _.truncate(this.meetup.descriptions, {
                length: 100
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
