<template>
    <div>
        <h1>Итого</h1>
        <hr>
        <div class="wrap">
            <div>
                <h4>Вопрос</h4>
                <p>{{questions[0].title}}</p>
                <p>{{questions[1].title}}</p>
            </div>
            <div>
                <h4>Ваш ответ</h4>
                <p>{{questions[0].rightAnswer}}</p>
                <p>{{printAnswers}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['questions'],
        computed: {
            printAnswers() {
                let string = ''
                for (let i = 0; i < this.questions[1].rightAnswer.length; i++) {
                    string = string + ' ' + this.questions[1].rightAnswer[i]
                }
                return string
            }
        }
    }
</script>

<style scoped>
    .wrap {
        display: flex;
        justify-content: space-between;
    }
</style>
