<template>
    <section>
        <p class="label mb-2">
            Upload Meetup Images
        </p>
        <b-field class="d-flex justify-content-center mb-4">
            <b-upload
                @input="previewImage"
                multiple
                drag-drop
                accept=".jpg,.jpeg,.png"
                :disabled="files.length >= 5"
                native
            >
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon pack="fas" icon="upload" size="is-large"></b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                        <p class="has-text-small has-text-danger">
                            max 5 image allowed
                        </p>
                    </div>
                </section>
            </b-upload>
        </b-field>
    </section>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'ImageUploader',
    props: {
        files: {
            type: Array,
            required: true
        }
    },
    methods: {
        previewImage(inputFiles) {
            if (inputFiles && inputFiles.length) {
                const { files } = this;
                const names = _.map(files, 'name');
                let imageFiles = inputFiles.filter(item => !names.includes(item.name));
                if (files.length + inputFiles.length >= 5) {
                    imageFiles = imageFiles.slice(0, 5 - files.length);
                }
                this.$emit('onImageSelect', imageFiles);
            }
        }
    }
};
</script>

<style scoped>
.delete-btn {
    top: 5px;
    right: 5px;
}
.upload-preview {
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid #c3c3c391;
    box-shadow: 0px 3px 5px #b7b1b7aa;
}
.upload-preview-item {
    background-size: cover;
    height: 100%;
}
</style>
