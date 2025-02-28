import { useState } from 'react'

export default (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }
    return { values: { type, value, onChange }, methods: { reset } }
}
