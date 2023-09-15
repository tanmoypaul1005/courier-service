import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../../app/utility/ProtectedRoute'
import Error404 from '../../views/common/errors/Error404'
import Layout from '../layout/Layout'

const CommonRoute = ({
    props,                      //don't pass anything here..
    mainComponent,
    routeExactPath = "/",       //main path of the route
    nestedRoute = false,        //do you need a nested routing?
    // nestedComponentsArea,        //provide all the Route components like this: <><Route path="sub-route-to-go-after-main-route" element={<Layout {...props}>{mainComponent}</Layout>} /> </>
    nestedComponentsArray,       // [ {relativePath: "123", subComponent:<REACT_COMPONENT /> } ]
}) => {
    return (
        <Routes>
            <Route exact path={routeExactPath} element={<ProtectedRoute />}>
                <Route path="" element={<Layout {...props}>{mainComponent}</Layout>} >
                    {/* {nestedRoute && nestedComponentsArea} */}
                    {
                        nestedRoute ? nestedComponentsArray?.map((item, index) => (
                            <Route key={index} path={item?.relativePath} index={item?.relativePath ? false : true} element={<>{item?.subComponent}</>} />
                        )) : ""}
                </Route>
            </Route>

        </Routes>
    )
}

export default CommonRoute