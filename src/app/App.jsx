import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import { Store } from './redux/Store'
import { GlobalCss, MatxSuspense, MatxTheme, MatxLayout } from 'app/components'
import sessionRoutes from './Screens/login/SessionRoutes'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <GlobalCss />
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <Router history={history}>
                                <AuthProvider>
                                    <MatxSuspense>
                                        <Switch>
                                            {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                            {sessionRoutes.map((item, i) => (
                                                <Route
                                                    key={i}
                                                    path={item.path}
                                                    component={item.component}
                                                />
                                            ))}
                                            {/* AUTH PROTECTED DASHBOARD PAGES */}
                                            <MatxLayout />{' '}
                                            {/* RETURNS <Layout1/> component */}
                                        </Switch>
                                    </MatxSuspense>
                                </AuthProvider>
                            </Router>
                        </BrowserRouter>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
