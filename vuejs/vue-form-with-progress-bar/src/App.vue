<template>

    <div class="wrap-1">

        <div class="wrap" v-if="showEnd">

            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="setBar" aria-valuenow="50" aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>

            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <div v-show='$v.email.$dirty' class="none" :class="addClassToCircl('email')"></div>
                    <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            @input="$v.email.$touch()"
                            v-model="email"
                            v-on:input="showEmail = true"

                    >
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <div v-show='$v.name.$dirty' class="circol-green" :class="addClassToCircl('name')"></div>
                    <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            @input="$v.name.$touch()"
                            v-model="name"
                    >
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Phone</label>
                    <div v-show='$v.phone.$dirty' class="circol-green" :class="addClassToCircl('phone')"></div>
                    <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            @input="$v.phone.$touch()"
                            v-model="phone"
                    >
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Some field 1</label>
                    <div v-show='$v.some1.$dirty' class="circol-green" :class="addClassToCircl('some1')"></div>
                    <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            @input="$v.some1.$touch()"
                            v-model="some1"
                    >
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Some field 2</label>
                    <div v-show='$v.some2.$dirty' class="circol-green" :class="addClassToCircl('some2')"></div>
                    <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            @input="$v.some2.$touch()"
                            v-model="some2"
                    >
                </div>

                <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="$v.$invalid"
                        v-on:click="showEnd = false"
                >Send data
                </button>
            </form>
        </div>

        <div v-if="!showEnd">
            <h3>Name: {{name}}</h3>
            <h3>Emaile: {{email}}</h3>
            <h3>Phone: {{phone}}</h3>
            <h4>Something: {{some1}}</h4>
            <h4>Something: {{some2}}</h4>
        </div>

    </div>
</template>

<script>
    import {required, email, minLength, numeric} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                email: '',
                name: '',
                phone: '',
                some1: '',
                some2: '',
                showEmail: false,
                showEnd: true
            }
        },
        validations: {
            email: {
                required,
                email,
            },
            name: {
                required
            },
            phone: {
                required,
                minLength: minLength(6),
                numeric
            },
            some1: {
                required
            },
            some2: {
                required
            }
        },
        computed: {
            addClassToCircl() {
                return (control) => {
                    return this.$v[control].$error ? 'circol-red' : 'circol-green'
                }
            },
            setBar() {
                let nameV = 0,
                    emailV = 0,
                    phoneV = 0,
                    some1V = 0,
                    some2V = 0

                !this.$v.name.$error && this.$v.name.$dirty ? nameV = 20 : 0
                !this.$v.email.$error && this.$v.email.$dirty ? emailV = 20 : 0
                !this.$v.phone.$error && this.$v.phone.$dirty ? phoneV = 20 : 0
                !this.$v.some1.$error && this.$v.some1.$dirty ? some1V = 20 : 0
                !this.$v.some2.$error && this.$v.some2.$dirty ? some2V = 20 : 0

                let sum = nameV + emailV + phoneV + some1V + some2V

                return `width: ${sum}%`
            }
        },

    }
</script>

<style>
    .none {
        display: none;
    }

    .wrap-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }

    .wrap {
        width: 500px;
    }

    .circol-green {
        display: inline-block;
        background: green;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        margin-left: 10px;
    }

    .circol-red {
        display: inline-block;
        background: red;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        margin-left: 10px;
    }
    form {
        margin-top: 15px;
    }
</style>
