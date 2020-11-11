import { useEffect, useState } from 'react'

export default function useFormInput(initialValue = '', validations) {
	const [value, setValue] = useState(initialValue)
	const [toBeValidated, setToBeValidated] = useState(false)
	const [helperText, setHelperText] = useState('')

	function handleChange(e) {
		setValue(e.target.value)
	}

	useEffect(() => {
		validate(value)
		// eslint-disable-next-line
	}, [value, toBeValidated])

	function validate(valueToValidate = value, dirty = toBeValidated) {
		if (!dirty) return true

		const errors = validations
			.reverse()
			.map(validation =>
				validation.regex.test(valueToValidate)
					? true
					: setHelperText(validation.message),
			)

		const allValidationsMatch = errors.every(item => item)
		if (!allValidationsMatch) return false

		setHelperText('')
		return true
	}

	function changeValue(value) {
		setValue(value)
	}

	return {
		attrs: {
			value,
			helperText,
			error: Boolean(helperText),
			onChange: handleChange,
		},
		validate: () => {
			setToBeValidated(true)
			return validate(value, true)
		},
		changeValue,
	}
}
