import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
	root: {
		backgroundColor: '#272932',
		height: '100vh',
		width: '100vw',
		display: 'flex',
		justifyContent: 'center',
		overflowY: 'auto',
		overflowX: 'hidden',
	},
})

export default function Wrapper(props) {
	const classes = useStyle()

	return <div className={classes.root}>{props.children}</div>
}
