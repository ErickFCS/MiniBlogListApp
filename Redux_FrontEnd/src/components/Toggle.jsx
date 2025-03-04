import { useState } from 'react'

import Button from 'react-bootstrap/Button'

const Toggle = ({ showButtonText, hideButtonText, children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const visibleWhenNoyVisible = { display: isVisible ? 'none' : 'block' }
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }
    return (
        <>
            <div style={visibleWhenVisible}>{children}</div>
            <Button variant='danger' style={visibleWhenVisible} onClick={toggleVisibility}>
                {hideButtonText}
            </Button>
            <Button variant='success' style={visibleWhenNoyVisible} onClick={toggleVisibility}>
                {showButtonText}
            </Button>
        </>
    )
}

export default Toggle
