export default {
    bind(el, options) {
        let times = parseInt(Object.keys(options.modifiers))

        if (options.modifiers.run) {
            let fs = 14 + 10
            let count = 0
            el.style.fontSize = fs + 'px'
            let delay1 = setInterval(() => {
                count++
                fs += 10
                el.style.fontSize = fs + 'px'
                if (count + 2 > times) {
                    clearInterval(delay1)
                }
            }, options.arg)
        } else {
            if (options.arg) {
                let fs = 14
                let count = 0

                if (count < times) {
                    let delay = setInterval(() => {
                        count++
                        fs += 10
                        el.style.fontSize = fs + 'px'
                        if (count + 1 > times) {
                            clearInterval(delay)
                        }
                    }, options.arg)
                }
            }
        }
    }
}
