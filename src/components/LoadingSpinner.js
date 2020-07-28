import React from 'react'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'

const override = css`
    display: block;
    margin: 0 auto;
`

const LoadingSpinner = ({loading}) => {
    return (
        <div className="sweet-loading">
            <ClipLoader
                css={override}
                size={50}
                color={"#54AF8E"}
                loading={loading}
            />
        </div>
    )
}

export default LoadingSpinner
