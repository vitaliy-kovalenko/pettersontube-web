import { makeStyles } from '@material-ui/core'

export default makeStyles({
	container: {
		margin: 0,
		padding: 16,
		width: '100%',
	},
	loadMoreButton: {
		margin: '16px auto',
	},
})

export const useVideoCardStyle = makeStyles({
	root: {
		margin: 'auto',
	},
	media: {
		height: 160,
	},
	title: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	description: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
})
