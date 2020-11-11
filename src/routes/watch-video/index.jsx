import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Box } from '@material-ui/core'
import ReactPlayer from 'react-player'

import Typography from 'components/typography'
import { usePlayerStyle } from './style'
import getVideoApi from './api'

export default function WatchVideo(props) {
	const classes = usePlayerStyle()
	const [video, setVideo] = useState()
	const [loaded, setLoaded] = useState(false)
	const { match: { params: { id } } } = props

	useEffect(() => {
		getVideoApi(id)
			.then(response => {
				setVideo(response.data)
				setLoaded(true)
			})
			.catch(() => setLoaded(true))
	}, [id])

	const renderNotFound = useMemo(() => {
		if (!loaded) return null

		return (
			<Typography color='textSecondary' variant='h3'>
				Video not found
			</Typography>
		)
	}, [loaded])

	const renderVideo = useMemo(() => {
		if (!video) return null

		return (
			<Fragment>
				<Typography color='textSecondary' variant='h3' className={classes.title}>
					{video.title}
				</Typography>
				<ReactPlayer
					width='100%'
					className={classes.videoPlayer}
					url={video.videoUrl}
					thumb
					playing={false}
					controls
				/>
				<Typography color='textSecondary' variant='body1' className={classes.description}>
					{video.description}
				</Typography>
			</Fragment>
		)
	}, [video, classes])

	const renderContent = useMemo(() => {
		if (!video) return renderNotFound

		return renderVideo
	}, [video, renderNotFound, renderVideo])

	return (
		<Box maxWidth={600}>
			{renderContent}
		</Box>
	)
}
