import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import Typography from 'components/typography'

export default function LinearProgressWithLabel(props) {
	return (
		<Box display='flex' alignItems='center'>
			<Box width='100%' mr={1}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant='body2' color='textSecondary'>{props.value}%</Typography>
			</Box>
		</Box>
	)
}

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired,
}
