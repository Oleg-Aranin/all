<template>

    <div class="wrap-1">
        <div class="wrap" v-if="showEnd">
            <div class="progress">
                <div class="progress-bar" role="progressbar" :style="setBar" aria-valuenow="50" aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>

            <form v-on:submit.prevent>
                <app-input v-for="(value, key) in controls"
                           v-bind:key="key"
                           v-bind:label="controls[key].label"
                           v-bind:type="controls[key].type"
                           v-on:changeEvent="actionInput($event, key)"
                           v-bind:show="$v.controls[key].$dirty"
                           v-bind:error="$v.controls[key].$error"
                           v-bind:value="controls[key].value"
                ></app-input>

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
            <h3>Name: {{controls.name.value}}</h3>
            <h3>Email: {{controls.email.value}}</h3>
            <h3>Phone: {{controls.phone.value}}</h3>
            <h4>Something: {{controls.some1.value}}</h4>
            <h4>Something: {{controls.some2.value}}</h4>
        </div>
    </div>
</template>

<script>
    import {required, email, minLength, numeric} from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                controls: {
                    email: {
                        label: "Email address",
                        type: "email",
                        control: "email",
                        value: ''
                    },
                    name: {
                        label: "Name",
                        control: "name",
                        value: ''
                    },
                    phone: {
                        label: "Phone",
                        control: "phone",
                        value: ''
                    },
                    some1: {
                        label: "Some1",
                        control: "some1",
                        value: ''
                    },
                    some2: {
                        label: "Some2",
                        control: "some2",
                        value: ''
                    },
                },
                showEnd: true
            }
        },
        validations: {
            controls: {
                email: {
                    value: {
                        required,
                        email,
                    }
                },
                name: {
                    value: {
                        required
                    }
                },
                phone: {
                    value: {
                        required,
                        minLength: minLength(6),
                        numeric
                    }
                },
                some1: {
                    value: {
                        required
                    }
                },
                some2: {
                    value: {
                        required
                    }
                },
            }
        },
        computed: {
            setBar() {
                let nameV = 0,
                    emailV = 0,
                    phoneV = 0,
                    some1V = 0,
                    some2V = 0

                !this.$v.controls.name.$error && this.$v.controls.name.$dirty ? nameV = 20 : 0
                !this.$v.controls.email.$error && this.$v.controls.email.$dirty ? emailV = 20 : 0
                !this.$v.controls.phone.$error && this.$v.controls.phone.$dirty ? phoneV = 20 : 0
                !this.$v.controls.some1.$error && this.$v.controls.some1.$dirty ? some1V = 20 : 0
                !this.$v.controls.some2.$error && this.$v.controls.some2.$dirty ? some2V = 20 : 0
                let sum = nameV + emailV + phoneV + some1V + some2V
                return `width: ${sum}%`
            }
        },
        methods: {
            actionInput(e, control) {
                this.controls[control].value = e
                this.$v.controls[control].$touch()
            }
        }
    }
</script>

<style>
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
