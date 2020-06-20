<template>
    <div>
        <div class="wrap" v-if="!showAgree">
            <div class="container1" v-on:scroll="onScrollDone($event)">
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
                <p>Lorem ipsum dolor sit amet, consectezztur adipisicing elit. Error, ipsum.</p>
            </div>

            <div class="spam" v-if="scrolled">
                <label for="check1">
                    <input id="check1" type="checkbox" v-model="agree">
                    I agree this text
                </label>
                <label for="check2">
                    <input id="check2" type="checkbox" velue="sendMe" v-model="sendSpam">
                    Send me spam
                </label>
            </div>

            <div class="spam" v-if="sendSpam">
                <div>
                    <label class="radio1">
                        <input type="radio" value="phone" v-model="phoneOrEmail">
                        on phone
                    </label>
                    <label>
                        <input type="radio" value="email" v-model="phoneOrEmail">
                        on email
                    </label>
                </div>

            </div>

            <button class="btn btn-primary" v-if="agree" v-on:click="showAgree = true">Send data</button>
        </div>

        <div v-if="showAgree" class="agree">
            <h4>I agree</h4>
            <h4>Send me spam on {{phoneOrEmail}}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scrolled: false,
                sendSpam: false,
                phoneOrEmail: 'email',
                agree: false,
                showAgree: false
            }
        },
        computed: {},
        methods: {
            onScrollDone(e) {
                if (e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 10) {
                    this.scrolled = true
                }
                window.console.log(this.phoneOrEmail)
            }
        }
    }
</script>

<style>
    .wrap, .agree {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 15px;
    }

    .container1 {
        width: 400px;
        height: 400px;
        overflow: auto;
    }

    .spam {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
    }

    .radio1 {
        margin-right: 10px;
    }
</style>
