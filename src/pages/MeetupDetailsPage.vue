<template>
    <div :class="['meetup-detail-page', bindClass]">
        <template v-if="meetup">
            <section class="hero">
                <div class="hero-body">
                    <div class="container">
                        <h2 class="subtitle">
                            {{ meetup.startDate | formatTime }}
                        </h2>
                        <h1 class="title">
                            {{ meetup.title }}
                        </h1>
                        <article class="media v-center">
                            <figure class="media-left">
                                <p
                                    class="image is-64x64 overflow-hidden rounded-circle avter-image"
                                >
                                    <img
                                        :src="meetup.images[0] | buildImagePath"
                                        :alt="meetup.title"
                                    />
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <!-- OPTIONAL: meetupCreator name -->
                                        Created by
                                        <strong>{{ creatorName }}</strong>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="is-pulled-right">
                        <!-- We will handle this later (: -->
                        <button
                            class="button is-danger"
                            v-if="userJoinedBefore(meetup.id)"
                            @click="handleLeaveMeetup"
                        >
                            Leave Group
                        </button>
                        <button
                            class="button is-primary"
                            v-if="userCanJoin"
                            @click="handleJoinMeetup"
                        >
                            Join In
                        </button>
                    </div>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <div class="columns">
                        <div class="column is-3">
                            <aside class="is-medium menu">
                                <div class="meetup-side-box">
                                    <div class="meetup-side-box-date mb-2">
                                        <p><b>Date</b></p>
                                        <p>
                                            {{ meetup.startDate | formatTime }}
                                        </p>
                                    </div>
                                    <div class="meetup-side-box-date mb-2">
                                        <p><b>Time</b></p>
                                        <!-- TODO: meetup timeFrom - timeTo -->
                                        <span>{{ meetup.timeFrom }}</span> -
                                        <span>{{ meetup.timeTo }}</span>
                                    </div>
                                    <div class="meetup-side-box-place mb-2">
                                        <p><b>How to find us</b></p>
                                        <!-- TODO: meetup location -->
                                        <p>
                                            {{ meetup.location.address }},
                                            {{ meetup.location.city }},
                                            {{ meetup.location.country }}
                                        </p>
                                    </div>
                                    <div class="meetup-side-box-more-info">
                                        <p><b>Additional Info</b></p>
                                        <!-- TODO: meetup shortInfo -->
                                        <p>{{ meetup.shortInfo }}</p>
                                    </div>
                                </div>
                                <div class="meetup-side-box-map">
                                    <img
                                        src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png"
                                        class="venueMap-mapImg span--100"
                                        alt="Location image of meetup venue"
                                    />
                                </div>
                                <!-- Threads Start -->
                                <p class="menu-label">
                                    Threads
                                </p>
                                <ul v-if="threads">
                                    <li v-for="thread in threads" :key="thread.id">
                                        {{ thread.title }}
                                    </li>
                                </ul>
                                <div
                                    v-else
                                    class="spiner-container d-flex justify-content-center align-items-center"
                                >
                                    <Spiner />
                                </div>
                                <p class="menu-label">
                                    Who is Going
                                </p>
                                <div
                                    class="columns is-multiline is-mobile"
                                    v-for="people in meetup.joinedPeople"
                                    :key="people.id"
                                >
                                    <!-- Joined People Images Here -->
                                    <div class="column is-3">
                                        <figure class="image is-64x64">
                                            <img
                                                class="is-rounded"
                                                :src="people.avatar | buildImagePath"
                                                alt="Image"
                                            />
                                        </figure>
                                    </div>
                                </div>
                                <!-- Threads Ends -->
                            </aside>
                        </div>
                        <div class="column is-7 is-offset-1">
                            <div class="content is-medium">
                                <h3 class="title is-3">
                                    About the Meetup
                                </h3>
                                <p>
                                    {{ meetup.descriptions }}
                                </p>
                                <p v-if="!isAuthenticated" class="button is-danger">
                                    You need authenticate in order to join
                                    <router-link
                                        :to="{
                                            name: 'loginPage',
                                            query: { redirect: $route.fullPath }
                                        }"
                                        class="ml-2 has-text-warning"
                                    >
                                        login
                                    </router-link>
                                    <span class="mx-1">or</span>
                                    <router-link
                                        :to="{
                                            name: 'signupPage',
                                            query: { redirect: `${$route.fullPath}` }
                                        }"
                                        class="has-text-warning"
                                    >
                                        signup
                                    </router-link>
                                </p>
                            </div>
                            <CreateThread v-if="showThreadCreateButton" :meetup-id="meetup.id" />
                            <div class="content is-medium">
                                <h3 class="title is-3">
                                    Threads
                                </h3>
                                <ThreadsItems v-if="threads" />
                                <div
                                    v-else
                                    style="height:200px"
                                    class="spiner-container d-flex justify-content-center align-items-center"
                                >
                                    <Spiner />
                                </div>
                                <p
                                    v-if="threads && Object.keys(threads).length < 1"
                                    class="p-4 text-center size-4"
                                >
                                    no threads found
                                </p>
                            </div>
                            <!-- Thread List END -->
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <ErrorHandler v-else-if="meetupNotFoundError" :error-title="meetupNotFoundError.message" />
        <div v-else class="spiner-container d-flex justify-content-center align-items-center">
            <Spiner />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ErrorHandler from '@/components/ErrorHandler';
import CreateThread from '@/components/Threads/CreateThread';
import ThreadsItems from '@/components/Threads/ThreadsItems';

export default {
    name: 'MeetupDetailsPage',
    data() {
        return {
            meetupNotFoundError: null
        };
    },
    computed: {
        ...mapGetters({
            meetup: 'meetups/meetup',
            threads: 'threads/threads',
            isAuthenticated: 'auth/isAuthenticated',
            isOwnerOfMeetup: 'auth/isOwnerOfMeetup',
            userJoinedBefore: 'auth/userJoinedBefore'
        }),
        userCanJoin() {
            return (
                this.isAuthenticated &&
                !this.isOwnerOfMeetup(this.meetup.meetupCreator.id) &&
                !this.userJoinedBefore(this.meetup.id)
            );
        },
        showThreadCreateButton() {
            if (!this.isAuthenticated) return false;
            return (
                this.isOwnerOfMeetup(this.meetup.meetupCreator.id) ||
                this.userJoinedBefore(this.meetup.id)
            );
        },
        creatorName() {
            return this.meetup.meetupCreator.name;
        },
        bindClass() {
            const classes = [
                'd-flex',
                'justify-content-center',
                'align-itmes-center',
                'flex-grow-1'
            ];
            if (!this.meetup) return classes;
            return '';
        }
    },
    methods: {
        ...mapActions({
            fetchMeetup: 'meetups/fetchMeetup',
            joinMeetup: 'meetups/joinMeetup',
            leaveMeetup: 'meetups/leaveMeetup',
            fetchThreads: 'threads/fetchThreads'
        }),
        async handleJoinMeetup() {
            try {
                await this.joinMeetup(this.meetup.id);
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully joined meetup',
                    position: 'is-top',
                    type: 'is-success'
                });
            } catch (err) {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: err,
                    position: 'is-top',
                    type: 'is-danger'
                });
            }
        },
        async handleLeaveMeetup() {
            try {
                await this.leaveMeetup(this.meetup.id);
                this.$buefy.toast.open({
                    duration: 3000,
                    message: 'successfully leave meetup',
                    position: 'is-top',
                    type: 'is-success'
                });
            } catch (err) {
                this.$buefy.toast.open({
                    duration: 3000,
                    message: err,
                    position: 'is-top',
                    type: 'is-danger'
                });
            }
        }
    },
    async created() {
        try {
            const { meetupSlug } = this.$route.params;
            const meetup = await this.fetchMeetup(meetupSlug);
            this.fetchThreads(meetup.id);
        } catch (err) {
            console.log(err);
            this.meetupNotFoundError = {
                status: true,
                message: err
            };
        }
    },
    components: { ErrorHandler, CreateThread, ThreadsItems }
};
</script>

<style scoped lang="scss">
.tag.is-warning {
    opacity: 0.5;
}
.meetup-detail-page {
    background-color: #f5f5f5;
    .mapouter {
        text-align: right;
        height: 500px;
        width: 600px;
    }
    .gmap_canvas {
        overflow: hidden;
        background: none !important;
        height: 500px;
        width: 600px;
    }
    .hero-body {
        background-color: white;
        border: 1px solid rgba(46, 62, 72, 0.12);
        color: white;
        background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
        > p,
        h1,
        h2,
        strong {
            color: white;
        }
    }
    .meetup-side-box {
        background-color: white;
        border-radius: 10px;
        font-size: 16px;
        padding: 15px;
    }
}
pre,
.message {
    max-width: 960px;
}
.v-center {
    align-items: center;
}
li {
    margin: 10px;
}
.hero.is-primary {
    background: linear-gradient(to top right, #524ad0 10%, #d099fa);
}
.box {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}
.box span.icon {
    float: right;
    font-size: 1.7em;
    padding: 2rem 2rem 0 0;
}
.is-large.fab {
    font-size: 7em;
}
.is-large.fas {
    font-size: 5em;
    margin-left: 0.2em;
}
.media-content {
    overflow: hidden;
}
.menu-list li a:hover {
    background: #d9d9d9;
}
.token.number {
    display: inline;
    padding: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: inherit;
    vertical-align: inherit;
    border-radius: inherit;
    font-weight: inherit;
    white-space: inherit;
    background: inherit;
    margin: inherit;
}
.footer {
    background-color: white;
}
// Post Create Input START
.textarea-post {
    padding-bottom: 30px;
}
.post-create {
    margin-bottom: 15px;
}
// Post Create END
// Thread List START
.content {
    figure {
        margin-bottom: 0;
    }
}
.media-content-threads {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px;
}
.media-left.user-image {
    margin: 0;
    margin-right: 15px;
}
.post-item {
}
.media + .media {
    border: none;
    margin-top: 0;
}
.post-content {
    margin: 0;
    &-message {
        font-size: 16px;
    }
    .author {
        font-size: 18px;
    }
    .post-time {
        font-size: 16px;
    }
}
// Thread List END
.avter-image {
    img {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
