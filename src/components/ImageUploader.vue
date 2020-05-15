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
                :disabled="dropFiles.length >= 5"
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
        <div class="d-flex flex-wrap">
            <figure
                class="upload-preview image is-128x128 mr-3 mb-3"
                v-for="(file, index) in dropFiles"
                :key="index"
            >
                <div class="upload-preview-item" ref="previewImage">
                    <div
                        class="w-100 h-100 d-flex justify-content-center align-items-center image-preview-loader"
                    >
                        <div class="spiner d-inline-block">
                            <div class="dot-spin" />
                        </div>
                    </div>
                </div>
                <button
                    class="delete position-absolute has-background-danger delete-btn"
                    type="button"
                    @click="deleteDropFile(index)"
                ></button>
            </figure>
        </div>
    </section>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'ImageUploader',
    data() {
        return {
            dropFiles: []
        };
    },
    methods: {
        deleteDropFile(index) {
            this.dropFiles.splice(index, 1);
        },
        previewImage(files) {
            if (files && files.length) {
                const { dropFiles } = this;
                const names = _.map(dropFiles, 'name');
                let imageFiles = files.filter(item => !names.includes(item.name));
                if (dropFiles.length + files.length >= 5) {
                    imageFiles = imageFiles.slice(0, 5 - dropFiles.length);
                }
                this.dropFiles = dropFiles.concat(imageFiles);
                imageFiles.forEach((file, index) => {
                    var reader = new FileReader();
                    reader.onload = e => {
                        let fileIndex = dropFiles.length ? dropFiles.length + index : index;
                        this.$refs.previewImage[
                            fileIndex
                        ].style.backgroundImage = `url('${e.srcElement.result}')`;

                        const loaderContainer = this.$refs.previewImage[fileIndex].querySelector(
                            '.image-preview-loader'
                        );
                        loaderContainer.classList.remove('d-flex');
                        loaderContainer.style.display = 'none';
                        this.$set(this.dropFiles, fileIndex, file);
                    };
                    reader.readAsDataURL(file);
                });
            }
        }
    },
    updated() {
        this.$emit('handleFile', this.dropFiles);
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
