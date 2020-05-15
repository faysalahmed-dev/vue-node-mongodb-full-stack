<template>
    <section class="section">
        <ImageUploader :files="images" @onImageSelect="selectImage" />
        <ImagePreview :files="images" @deleteImage="deleteImage" />

        <b-field
            label="Additional Info"
            :type="{ 'is-danger': hasError('shortInfo').status }"
            :message="hasError('shortInfo').message"
            class="flex-column"
        >
            <p class="text-right has-text-gray mb-2">
                total words {{ formData.shortInfo | countWord }}
            </p>
            <b-input
                name="shortInfo"
                type="textarea"
                rows="4"
                placeholder="write about meetup here..."
                @blur="validator_handleBlur"
                @input.native="validator_handleChange"
            ></b-input>
        </b-field>

        <b-field
            label="Descriptions"
            :type="{ 'is-danger': hasError('descriptions').status }"
            :message="hasError('descriptions').message"
            class="flex-column"
        >
            <p class="text-right has-text-gray mb-2">
                total words {{ formData.descriptions | countWord }}
            </p>
            <b-input
                name="descriptions"
                type="textarea"
                rows="10"
                placeholder="write full descriptions about meetup here..."
                @blur="validator_handleBlur"
                @input.native="validator_handleChange"
            ></b-input>
        </b-field>

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
                @click.prevent="gotoNext"
                :disabled="buttonDisable"
            >
                Next
            </b-button>
        </div>
    </section>
</template>
<script type="text/javascript">
import validator_mixin from '@/mixins/validator.mixin';
import ImageUploader from '@/components/ImageUpload/ImageUpload';
import ImagePreview from '@/components/ImageUpload/ImagePreview';

export default {
    name: 'MeetupDescriptions',
    mixins: [validator_mixin],
    data() {
        return {
            formData: {
                shortInfo: null,
                descriptions: null
            },
            images: []
        };
    },
    computed: {
        hasError() {
            return field => this.validator[field].error;
        },
        buttonDisable() {
            return this.validator_buttonIsDisabled || this.images.length < 1;
        }
    },
    methods: {
        gotoNext() {
            if (!this.buttonDisable)
                this.$emit('handleSubmit', {
                    ...this.formData,
                    images: this.images
                });
        },
        deleteImage(imageIndex) {
            //console.log(imageIndex);
            this.images = this.images.filter((_, index) => index !== imageIndex);
        },
        selectImage(newImage) {
            this.images = this.images.concat(newImage);
        }
    },
    components: {
        ImageUploader,
        ImagePreview
    }
};
</script>
