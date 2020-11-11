import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core'

import Typography from 'components/typography'
import { useVideoCardStyle } from './style'

export default function VideoCard({ video }) {
	const { title, description } = video
	const classes = useVideoCardStyle()

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={video.thumbUrl}
					title='Contemplative Reptile'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{title}
					</Typography>
					<Typography
						className={classes.description}
						variant='body2'
						color='textSecondary'
						component='p'
					>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
