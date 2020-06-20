import React, {useEffect, useRef} from "react";

export default value => {
    const ref = useRef(null)

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}
