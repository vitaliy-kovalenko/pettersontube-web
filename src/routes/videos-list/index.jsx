import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Typography from 'components/typography'
import { useRouter } from 'routes/custom-browser-router'
import VideoCard from './video-card'
import useStyle from './style'
import { getVideosApi } from './api'

export default function VideosList() {
	const classes = useStyle()
	const [loaded, setLoaded] = useState(false)
	const [videos, setVideos] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(0)
	const router = useRouter()

	const getVideos = useCallback(() => {
		getVideosApi(page).then(response => {
			if (response.data.length < 20) {
				setHasMore(false)
			}
			setPage(page + 1)
			setLoaded(true)

			setVideos(videos.concat(response.data))
		})
	}, [videos, page])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(getVideos, [])

	const handleCardClick = useCallback(video => {
		router.history.push('/watch/' + video._id)
	}, [router])

	const renderNoVideos = useMemo(() => (
		<Typography color='textSecondary' variant='h3'>
			No videos found.
			<br />
			<Link to={'/upload'}>Create one!</Link>
		</Typography>
	), [])

	const renderVideoCards = useMemo(
		() =>
			videos.map((video, index) => (
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
					<VideoCard video={video} onClick={handleCardClick} />
				</Grid>
			)),
		[videos, handleCardClick],
	)

	const renderContent = useMemo(() => {
		if (loaded && !videos.length) return renderNoVideos

		return renderVideoCards
	}, [loaded, videos, renderNoVideos, renderVideoCards])

	const renderLoadMore = useMemo(() => {
		if (!hasMore) return null
		if (!loaded) return null

		return (
			<Button
				className={classes.loadMoreButton}
				onClick={getVideos}
				variant='outlined'
			>
				Load more
			</Button>
		)
	}, [classes, getVideos, hasMore, loaded])

	return (
		<Box
			width='100%'
			display='flex'
			flexDirection='column'>
			<Grid container spacing={3} className={classes.container}>
				{renderContent}
			</Grid>
			{renderLoadMore}
		</Box>
	)
}
