import { makeStyles } from '@material-ui/core'

export default makeStyles({
	container: {
		margin: 0,
	},
	dropzone: {
		width: '100%',
		height: 270,
		border: '1px dashed #0F7173',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		whiteSpace: 'break-spaces',
		cursor: 'pointer',
		margin: '8px auto',
	},
	videoPlayer: {
		margin: 'auto',
		maxWidth: '100%',
	},
	playerCloseButton: {
		position: 'absolute',
		top: 8,
		right: 8,
	},
	centerItem: {
		margin: 'auto',
	},
	progress: {
		position: 'absolute',
		right: 10,
		width: 16,
		height: 16,
	},
})
