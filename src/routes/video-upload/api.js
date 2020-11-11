import axiosInstance from 'lib/common/axios-instance'

export function createVideoApi(data, onUploadProgress = () => null) {
	const formData = new FormData()

	formData.append('title', data.title)
	formData.append('description', data.description)
	formData.append('file', data.file)

	return axiosInstance({
		method: 'post',
		url: '/videos',
		data: formData,
		onUploadProgress,
		headers: {
			'Content-Type': 'multipart/formdata',
		},
	})
}
