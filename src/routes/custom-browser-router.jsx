import React, { useContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import parseQueryParams from 'lib/common/parse-query-params'

export const RouterContext = React.createContext({})

const CustomBrowserRouter = props => (
	<BrowserRouter>
		<Route>
			{routeProps => {
				const query = parseQueryParams(routeProps.location.search)
				return (
					<RouterContext.Provider value={{ ...routeProps, query }}>
						{props.children}
					</RouterContext.Provider>
				)
			}}
		</Route>
	</BrowserRouter>
)

export const useRouter = () => useContext(RouterContext)

export default CustomBrowserRouter
