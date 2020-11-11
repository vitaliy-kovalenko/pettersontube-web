import axiosInstance from 'lib/common/axios-instance'

export function getVideosApi(page) {
	const limit = 20

	return axiosInstance({
		method: 'get',
		url: '/videos',
		params: {
			limit,
			offset: limit * page,
		},
	})
}
