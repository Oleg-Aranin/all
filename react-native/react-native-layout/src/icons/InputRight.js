import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
    <Svg width={24} height={21} fill="none" {...props}>
        <Path
            d="M4 4.167h2V16.67H4V4.167zm3 0h1V16.67H7V4.167zm2 0h3V16.67H9V4.167zm4 0h1V16.67h-1V4.167zm3 0h2V16.67h-2V4.167zm3 0h1V16.67h-1V4.167zM2 2.084V6.25H0V2.084C0 1.53.21 1 .586.61A1.96 1.96 0 012 0h4v2.084H2zM22 0c.53 0 1.04.22 1.414.61.375.391.586.921.586 1.474V6.25h-2V2.084h-4V0h4zM2 14.586v4.168h4v2.083H2c-.53 0-1.04-.22-1.414-.61A2.129 2.129 0 010 18.754v-4.168h2zm20 4.168v-4.168h2v4.168c0 .552-.21 1.082-.586 1.473a1.96 1.96 0 01-1.414.61h-4v-2.083h4z"
            fill="#FEFEFE"
        />
    </Svg>
)

export default SvgComponent
