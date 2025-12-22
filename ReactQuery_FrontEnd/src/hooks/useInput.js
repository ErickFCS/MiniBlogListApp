import { useState, } from 'react'

export default (type, initialValue,) => {
    const [value, setValue,] = useState(initialValue || '',)
    const onChange = (event,) => {
        setValue(event.target.value,)
    }
    const reset = () => {
        setValue('',)
    }
    return { values: { type, value, onChange, }, methods: { reset, }, }
}
