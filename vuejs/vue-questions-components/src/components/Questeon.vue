<template>
    <div>
        <h4>{{title}}</h4>
        <hr>
        <div class="answers">
            <label v-for="item in answers" v-bind:key="item">
                <input
                        v-bind:type="type"
                        v-bind:value="item"
                        v-on:change="changeAnswer($event)"
                        v-bind:name="type"
                >
                {{item}}
            </label>
        </div>
        <button
                class="btn btn-primary"
                v-bind:disabled="!rightAnswer"
                v-on:click="callback"
        >next</button>
    </div>
</template>

<script>
    export default {
        props: ['type', 'title', 'answers', 'rightAnswer', 'callback'],
        methods: {
            changeAnswer(e) {
                this.$emit('chAnswer', e.target.value)
            }
        },
    }
</script>

<style scoped>
    .answers {
        display: flex;
        flex-direction: column;
    }

    button {
        margin-top: 15px;
    }
</style>
