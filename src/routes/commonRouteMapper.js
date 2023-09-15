import ProtectedRoute from "../app/utility/ProtectedRoute";
import Layout from "../components/layout/Layout";
import ForgotPassword from "../views/common/auth/ForgotPassword";
import Login from "../views/common/auth/Login";
import OtpVerification from "../views/common/auth/OtpVerification";
import Register from "../views/common/auth/Register";
import Dashboard from "../views/common/dashboard/Dashboard";
import Error404 from "../components/errors/Error404";
import FavoriteAddress from "../views/common/favoriteAddress/FavoriteAddress";
import Notification from "../views/common/notification/Notification";
import ChangePassword from "../views/common/settings/ChangePassword";
import Contact from "../views/common/settings/Contact";
import Faq from "../views/common/settings/Faq";
import Language from "../views/common/settings/Language";
import EditCompanyProfile from "../views/common/settings/profile/company/EditCompanyProfile";

import Settings from "../views/common/settings/Settings";
import TermsConditions from "../views/common/settings/TermsConditions";
import CreateRequest from "../views/common/createRequest/CreateRequest";
import RequestList from "../views/common/requests/requestList/RequestList";
import RequestDetailsSection from "../views/common/requests/requestDetails/RequestDetailsSection";
import DeleteAccount from "../views/common/settings/DeleteAccount";
import Profile from "../views/common/settings/profile/Profile";
import ForgetPasswordUpdate from "../views/common/auth/ForgetPasswordUpdate";
import ExpressLogin from "../views/common/auth/ExpressLogin";

export const commonRouteMapper = [

    { path: "/login", element: <Login />, },
    { path: "/express/login/:user_id/:express_token", element: <ExpressLogin />, },
    { path: "/admin-login", element: <Login />, },
    { path: "/admin/login", element: <Login />, },
    { path: "/register", element: <Register />, },
    { path: "/otp-verification", element: <OtpVerification />, },
    { path: "/forgot-password", element: <ForgotPassword />, },
    { path: "/set-new-password", element: <ForgetPasswordUpdate />, },

    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><Dashboard /></Layout> },

        ],
    },

    {
        path: "/request",
        element: <ProtectedRoute />,
        children: [
            { path: "create", element: <Layout><CreateRequest /></Layout> },
            { path: "edit/:request_id", element: <Layout><CreateRequest /></Layout> },

        ],
    },

    {
        path: "/requests",
        element: <ProtectedRoute />,
        children: [
            // request all type of lists
            { path: "saved", element: <Layout><RequestList /></Layout> },
            { path: "invitation", element: <Layout><RequestList /></Layout> },
            { path: "in-bidding", element: <Layout><RequestList /></Layout> },
            { path: "not-planned", element: <Layout><RequestList /></Layout> },
            { path: "awarded", element: <Layout><RequestList /></Layout> },
            { path: "on-going", element: <Layout><RequestList /></Layout> },
            { path: "completed", element: <Layout><RequestList /></Layout> },
            { path: "history", element: <Layout><RequestList /></Layout> },

            // details
            { path: ":type/details/:request_id", element: <Layout><RequestDetailsSection /></Layout> },

        ],
    },


    {
        path: "/notification",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><Notification /></Layout> },

        ],
    },

    {
        path: "/favorite-address",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><FavoriteAddress /></Layout> },

        ],
    },


    {
        path: "/settings",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Layout><Settings /></Layout>,
                children: [
                    { path: "", element: <Profile /> },
                    { path: "company-profile/edit", element: <EditCompanyProfile /> },
                    { path: "change-password", element: <ChangePassword /> },
                    { path: "contact", element: <Contact /> },
                    { path: "faq", element: <Faq /> },
                    { path: "language", element: <Language /> },
                    { path: "terms-conditions", element: <TermsConditions /> },
                    { path: "delete-account", element: <DeleteAccount /> },
                ]
            },
        ],
    },










    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { path: "*", element: <Layout><Error404 /></Layout> },

        ],
    },
]