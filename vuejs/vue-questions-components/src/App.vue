<template>
    <div class="container wrap">
        <div class="progress">
            <div class="progress-bar" role="progressbar" v-bind:style="setProgressBar" aria-valuenow="50" aria-valuemin="0"
                 aria-valuemax="100"></div>
        </div>

        <questeon
                v-bind:type="questions[0].type"
                v-bind:title="questions[0].title"
                v-bind:answers="questions[0].answers"
                v-bind:rightAnswer="questions[0].rightAnswer"
                v-on:chAnswer="setAnswer($event)"
                v-if="showQuestion === 'first'"
                v-bind:callback="() => showQuestion = 'second' "
        ></questeon>

        <questeon
                v-bind:type="questions[1].type"
                v-bind:title="questions[1].title"
                v-bind:answers="questions[1].answers"
                v-bind:rightAnswer="questions[1].rightAnswer"
                v-on:chAnswer="setAnswer2($event)"
                v-if="showQuestion === 'second'"
                v-bind:callback="() => showQuestion = 'final' "
        ></questeon>

        <final
                v-bind:questions="questions"
                v-if="showQuestion === 'final'"
        ></final>
    </div>


</template>

<script>
    import Questeon from "./components/Questeon";
    import Final from "./components/Final";

    export default {
        computed: {
          setProgressBar() {
              let progress = 0

              if (this.showQuestion === 'second') {
                  progress = 50
              } else if (this.showQuestion === 'final') {
                  progress = 100
              }

              return {width: progress + '%'}
          }
        },
        data() {
            return {
                questions: [
                    {
                        type: 'radio',
                        title: 'Какой тег задает ссылку?',
                        answers: [
                            'a', 'div', 'span', 'img'
                        ],
                        rightAnswer: false
                    },
                    {
                        type: 'checkbox',
                        title: 'Какие из этих тегов строчные?',
                        answers: [
                            'a', 'div', 'span', 'img'
                        ],
                        rightAnswer: false
                    }
                ],
                showQuestion: 'first'
            }
        },
        components: {
            Questeon,
            Final
        },
        methods: {
            setAnswer(e) {
                this.questions[0].rightAnswer = e
            },
            setAnswer2(e) {
                let answers = this.questions[1].rightAnswer
                if (answers === false) {
                    this.questions[1].rightAnswer = [e]
                } else {
                    let setValue = answers.find(i => i === e)
                    if (setValue) {
                        this.questions[1].rightAnswer = answers.filter(item => item !== e)
                    } else {
                        this.questions[1].rightAnswer = [...this.questions[1].rightAnswer, e]
                    }
                }
            }
        }
    }
</script>

<style>
    .wrap {
        width: 500px;
        margin-top: 15px;
    }

</style>
