import React from 'react'
import { Typography as MuiTypography } from '@material-ui/core'

function getStyleProp(props) {
	const { fontWeight, fontStyle, style: styleProp, fontColor: color } = props

	const style = { ...styleProp }
	if (color) style.color = color
	if (fontWeight) style.fontWeight = fontWeight
	if (fontStyle) style.fontStyle = fontStyle

	return style
}

export default function Typography(props) {
	const { variant, className, ...other } = props

	const style = getStyleProp(props)

	return (
		<MuiTypography
			{...other}
			variant={variant}
			className={className}
			style={style}
		>
			{props.children}
		</MuiTypography>
	)
}

Typography.defaultProps = {
	variant: 'body2',
}
