<template>
    <div class="d-flex flex-wrap">
        <figure
            class="upload-preview image is-128x128 mr-3 mb-3"
            v-for="(file, index) in files"
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
                v-if="deleteAble"
                class="delete position-absolute has-background-danger delete-btn"
                type="button"
                @click="$emit('deleteImage', index)"
            ></button>
        </figure>
    </div>
</template>

<script>
export default {
    name: 'ImagePreview',
    props: {
        files: {
            type: Array,
            required: true
        },
        deleteAble: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        files(files) {
            this.previewImage(files);
        }
    },
    methods: {
        previewImage(files) {
            if (!Array.isArray(files)) return;
            files.forEach((file, index) => {
                var reader = new FileReader();
                reader.onload = e => {
                    this.$refs.previewImage[
                        index
                    ].style.backgroundImage = `url('${e.srcElement.result}')`;
                    const loaderContainer = this.$refs.previewImage[index].querySelector(
                        '.image-preview-loader'
                    );
                    loaderContainer.classList.remove('d-flex');
                    loaderContainer.style.display = 'none';
                };
                reader.readAsDataURL(file);
            });
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
    background-position: center top;
    height: 100%;
}
</style>
