import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Wrapper from 'components/wrapper'
import NotFoundPage from './not-found'
import CustomBrowserRouter from './custom-browser-router'
import VideosList from './videos-list'
import UploadVideo from './video-upload'
import WatchVideo from './watch-video'

function AppRouter() {
	return (
		<Wrapper>
			<CustomBrowserRouter>
				<Switch>
					<Route path='/' exact component={VideosList} />
					<Route path='/upload' exact component={UploadVideo} />
					<Route path='/watch/:id' component={WatchVideo} />
					<Route component={NotFoundPage} />
				</Switch>
			</CustomBrowserRouter>
		</Wrapper>
	)
}

export default AppRouter
