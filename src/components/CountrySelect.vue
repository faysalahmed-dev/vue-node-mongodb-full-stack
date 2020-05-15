<template>
    <div class="country-select">
        <div class="country-select__drop-down" @click="showDropDown = !showDropDown">
            <div class="selected-item" v-if="selected">
                <span class="flag" v-html="selected.image"></span>
                <span class="name">{{ selected.country }} - {{ selected.isoCode }}</span>
                (
                <span>+{{ selected.code }}</span>
                )
            </div>
            <template v-else>
                <span>Select Country </span>
            </template>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down"
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
        <div class="country-select__list" v-show="showDropDown">
            <div class="search-country">
                <input type="text" v-model.trim="search" />
            </div>
            <div class="country-select__list-item-container">
                <div
                    class="country-select__list-item"
                    v-for="country in list"
                    :key="country.isoCode"
                    @click="handleSelect(country)"
                >
                    <span class="flag" v-html="country.image"></span>
                    <span class="name">{{ country.country }} - {{ country.isoCode }}</span>
                    (
                    <span>+{{ country.code }}</span>
                    )
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from '@/assets/country-data';
export default {
    data() {
        return { showDropDown: false, search: null, selected: null };
    },
    computed: {
        list() {
            if (!this.search) return data;
            let byCodeFilter = [];
            let byCountryFilter = [];
            Object.values(data).forEach(el => {
                const byCountryName = el.country.toLowerCase();
                const byCode = el.isoCode.toLowerCase();
                if (byCode.indexOf(this.search) !== -1) {
                    byCodeFilter.push(el);
                } else if (byCountryName.indexOf(this.search) !== -1) {
                    byCountryFilter.push(el);
                }
            });
            return [...byCodeFilter, ...byCountryFilter];
        }
    },
    methods: {
        handleSelect(item) {
            this.selected = item;
            this.showDropDown = false;
            this.$emit('onSelect', this.selected);
        }
    }
};
</script>

<style lang="scss" scoped>
.country-select {
    width: 100%;
    --scrollbarBG: #e2e2e2;
    --thumbBG: #bbbbbb;
}
.country-select__drop-down {
    width: 100%;
    padding: 10px;
    border: 1px solid #33333326;
    border-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    span,
    svg {
        display: inline-block;
    }
}
.selected-item {
    padding: 0 10px;
}
.country-select__list {
    border: 1px solid #33333326;
    border-top: transparent;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    padding-top: 10px;
    margin-top: -5px;
    .search-country {
        padding: 7px 20px;
        input {
            width: 100%;
            padding: 7px;
            border-radius: 7px;
            border: 1px solid #33333326;
            display: block;
        }
    }

    &-item {
        padding: 5px 20px;
        display: flex;
        border-bottom: 1px solid #33333326;
        cursor: pointer;
        &-container {
            max-height: 400px;
            overflow: auto;
            &::-webkit-scrollbar {
                width: 13px;
            }
            & {
                scrollbar-width: thin;
                scrollbar-color: var(--thumbBG) var(--scrollbarBG);
            }
            &::-webkit-scrollbar-track {
                background: var(--scrollbarBG);
                border-radius: 30px;
            }
            &::-webkit-scrollbar-thumb {
                background-color: var(--thumbBG);
                border-radius: 6px;
                border: 1px solid var(--scrollbarBG);
            }
        }
        span {
            display: inline-block;
        }
        &:hover {
            background: #33333326;
        }
    }
}
.flag {
    width: 20px;
    margin-right: 10px;
}
.name {
    margin-right: 10px;
}
</style>
