<template>
    <div class="form-group">
        <label>{{label}}</label>
        <div v-show="show" :class="error ? 'circol-red' : 'circol-green' "></div>
        <input
                v-bind:type="type || 'text'"
                class="form-control"
                v-on:input="changeValue($event)"
                v-bind:value="value"
        >
    </div>
</template>

<script>
    export default {
        props: ['label', 'type', 'show', 'error', 'value'],
        methods: {
            changeValue(e) {
                this.$emit('changeEvent', e.target.value)
            }
        }
    }
</script>

<style scoped>

</style>
