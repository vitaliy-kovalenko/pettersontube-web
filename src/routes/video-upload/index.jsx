import React, { useCallback, useMemo, useState } from 'react'
import { Box, FormControl, Grid, TextField, Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDropzone } from 'react-dropzone'
import ReactPlayer from 'react-player'

import Typography from 'components/typography'
import useFormInput from 'lib/common/use-form-input'

import useStyle from './style'
import { createVideoApi } from './api'
import LinearWithValueLabel from 'components/linear-progress-with-label'

export default function UploadVideo() {
	const classes = useStyle()
	const [loading, setLoading] = useState(false)
	const [progress, setProgress] = useState(0)
	const title = useFormInput()
	const description = useFormInput()
	const [file, setFile] = useState()

	const onDrop = useCallback(([firstFile]) => {
		setFile(firstFile)
	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
	} = useDropzone({ onDrop, maxFiles: 1, accept: 'video/*', maxSize: 50 * 1024 * 1024 })

	const onProgress = useCallback((event) => {
		setProgress(Math.round((event.loaded * 100) / event.total))
	}, [])

	const clearState = useCallback(() => {
		setLoading(false)
		title.changeValue('')
		description.changeValue('')
		setFile(null)
		setProgress(0)
	}, [description, title])

	const handleSubmit = useCallback(e => {
		e.preventDefault()
		setLoading(true)

		const dataToSend = {
			title: title.attrs.value,
			description: description.attrs.value,
			file,
		}

		createVideoApi(dataToSend, onProgress)
			.then(() => {
				clearState()
				alert('Your video has been successfully created.')
			}).catch(error => {
				setLoading(false)
				setProgress(0)
				alert(`Error creating a video: ${error.response.data.message}`)
			})
	}, [title, description, file, onProgress, clearState])

	const renderDropzone = useMemo(() => (
		<div {...getRootProps()} className={classes.dropzone}>
			<input {...getInputProps()} />
			{
				isDragActive ?
					<Typography color='textSecondary' variant='body1'>
						Drop the files here ...
					</Typography> :
					<Typography color='textSecondary' variant='body1'>
						{'Drag \'n\' drop your video file here,\n or click to select video.\nMax size is 50MB'}
					</Typography>
			}
		</div>
	),[
		getRootProps,
		getInputProps,
		isDragActive,
		classes,
	])

	const renderBlobVideo = useMemo(() => {
		if (!file) return null
		return (
			<Box>
				<ReactPlayer
					height='270px'
					width='100%'
					className={classes.videoPlayer}
					url={URL.createObjectURL(file)}
					playing={false}
					controls
				/>
				<IconButton onClick={() => setFile(null)} className={classes.playerCloseButton}>
					<DeleteIcon color='secondary' />
				</IconButton>
			</Box>
		)
	}, [file, classes])

	const renderSubmit = useMemo(() => (
		<Button disabled={loading} type='submit' variant='contained' color='primary'>
			Submit
		</Button>
	), [loading])

	const renderProgress = useMemo(() => {
		if (progress === 0) return null

		return <LinearWithValueLabel color='secondary' value={progress} />
	}, [progress])

	return (
		<Grid container alignItems='center' spacing={3} className={classes.container}>
			<Grid item xs={12} md={6} xl={3} className={classes.centerItem}>
				<form onSubmit={handleSubmit}>
					<FormControl fullWidth margin='dense'>
						<Typography variant='h3' align='center' color='textSecondary'>
							Upload your video
						</Typography>
					</FormControl>
					<FormControl fullWidth margin='dense'>
						{file ? renderBlobVideo : renderDropzone}
					</FormControl>
					<FormControl fullWidth margin='dense'>
						<TextField label='Title' variant='outlined' {...title.attrs} />
					</FormControl>
					<FormControl fullWidth margin='dense'>
						<TextField multiline label='Description' variant='outlined' {...description.attrs} />
					</FormControl>
					<FormControl fullWidth margin='dense'>
						{renderSubmit}
					</FormControl>
					<FormControl fullWidth margin='dense'>
						{renderProgress}
					</FormControl>
				</form>
			</Grid>
		</Grid>
	)
}
