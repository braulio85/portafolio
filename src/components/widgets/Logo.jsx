/* eslint-disable react/prop-types */
import './Logo.scss'
import { Utils } from '/src/hooks/utils.js'


function Logo({ className = '', style = {}, size, setDidLoad }) {
    const utils = Utils;

    className = className || ``
    size = utils.number.forceIntoBounds(size, 0, 3, 3)

    const sizeClass = `logo-wrapper-size-${size}`

    return (
        <div className={`logo-wrapper ${sizeClass} ${className}`} style={style}>
            <img
                src={utils.file.resolvePath(`/images/pictures/miniatura.webp`)}
                onLoad={() => {
                    setDidLoad && setDidLoad(true)
                }}
                alt={`logo`}
            />
        </div>
    )
}

export default Logo
