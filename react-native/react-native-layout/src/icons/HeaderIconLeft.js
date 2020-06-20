import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
    <Svg width={17} height={17} fill="none" {...props}>
        <Path
            d="M15 3.667h-3.333V2A1.667 1.667 0 0010 .333H6.667A1.66 1.66 0 005 2v1.667H1.667A1.66 1.66 0 000 5.333V14.5a1.667 1.667 0 001.667 1.667H15a1.667 1.667 0 001.667-1.667V5.333A1.667 1.667 0 0015 3.667zM6.667 2H10v1.667H6.667V2zm1.666 4.167a2.083 2.083 0 110 4.166 2.083 2.083 0 010-4.166zM12.5 14.5H4.167v-1.042c0-1.15 1.866-2.083 4.166-2.083 2.3 0 4.167.933 4.167 2.083V14.5z"
            fill="#FEFEFE"
        />
    </Svg>
)

export default SvgComponent

