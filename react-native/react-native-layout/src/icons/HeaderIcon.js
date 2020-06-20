import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
    <Svg width={12} height={7} fill="none" {...props}>
        <Path
            d="M1.712.292l3.88 3.88 3.88-3.88a.997.997 0 011.41 1.41l-4.59 4.59a.996.996 0 01-1.41 0l-4.59-4.59a.996.996 0 010-1.41c.39-.38 1.03-.39 1.42 0z"
            fill="#002A5C"
        />
    </Svg>
)

export default SvgComponent
