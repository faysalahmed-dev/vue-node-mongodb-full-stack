<template>
    <div>
        <div class="box" v-for="thread in threads" :key="thread.id">
            <!-- Thread title -->
            <div class="d-flex align-items-center">
                <h4 id="const" class="title is-5 mb-2 flex-grow-1">
                    {{ thread.title }}
                </h4>
                <div class="threads-controll" v-if="threadEditAble(thread.user.id)">
                    <b-dropdown aria-role="list" :mobile-modal="false" position="is-bottom-left">
                        <button class="button" slot="trigger">
                            <b-icon icon="cog"></b-icon>
                        </button>
                        <b-dropdown-item
                            aria-role="listitem"
                            v-if="isOwnerOfThread(thread.user.id)"
                        >
                            <b-icon
                                icon="edit"
                                size="is-small"
                                class="mr-2"
                                type="is-primary"
                            ></b-icon>
                            Edit
                        </b-dropdown-item>
                        <b-dropdown-item aria-role="listitem">
                            <b-icon
                                icon="trash-alt"
                                size="is-small"
                                class="mr-2"
                                type="is-danger"
                            ></b-icon>
                            Delete
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>

            <div class="d-flex align-items-center size-2">
                <figure class="is-rounded is-24x24 image m-0">
                    <img class="is-rounded" :src="thread.user.avatar | buildImagePath" />
                </figure>
                <span class="mx-2 has-text-primary">{{ thread.user.name }}</span>
                <span>{{ thread.createdAt | formatTime('LLL') }}</span>
            </div>
            <PostCreator :thread-id="thread.id" v-if="showThreadPostCreateForm" />
            <!-- Create new post END, handle later -->
            <!-- Posts START -->
            <div class="my-4"></div>
            <div
                v-for="post in thread.posts"
                :key="post.id"
                class="py-2 pl-3 pr-2 mb-2 post-item rounded"
            >
                <div class="d-flex align-items-center size-2 mb-2">
                    <figure class="is-rounded is-24x24 image m-0">
                        <img class="is-rounded" :src="post.user.avatar | buildImagePath" />
                    </figure>
                    <span class="mx-2 has-text-primary">{{ post.user.name }}</span>
                    <span>{{ post.updatedAt | formatTime('LLL') }}</span>
                    <b-icon icon="ellipsis-h" class="mr-2 ml-auto pointer"></b-icon>
                </div>
                <p class="size-3">{{ post.text }}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import PostCreator from './PostCreator';
export default {
    name: 'ThreadsItems',
    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/isAuthenticated',
            user: 'auth/user',
            meetup: 'meetups/meetup',
            threads: 'threads/threads',
            isOwnerOfMeetup: 'auth/isOwnerOfMeetup',
            userJoinedBefore: 'auth/userJoinedBefore'
        }),
        threadEditAble() {
            return threadCreatorId => {
                const { isAuthenticated, meetup } = this;
                if (!isAuthenticated) return false;
                return (
                    this.isOwnerOfThread(threadCreatorId) ||
                    this.isOwnerOfMeetup(meetup.meetupCreator.id)
                );
            };
        },
        isOwnerOfThread() {
            return threadCreatorId => this.user.id === threadCreatorId;
        },
        showThreadPostCreateForm() {
            if (!this.isAuthenticated) return false;
            return (
                this.isOwnerOfMeetup(this.meetup.meetupCreator.id) ||
                this.userJoinedBefore(this.meetup.id)
            );
        }
    },
    components: { PostCreator }
};
</script>
<style type="text/css" scoped>
.post-item {
    border: 1px solid #dbdada;
    box-shadow: 0 3px 3px #2c2b2b14;
}
</style>
