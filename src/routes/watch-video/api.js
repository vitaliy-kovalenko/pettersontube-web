import axiosInstance from 'lib/common/axios-instance'

export default function getVideoApi(id) {
	return axiosInstance({
		method: 'get',
		url: `/videos/${id}`,
	})
}
