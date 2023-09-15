import ProtectedRoute from "../app/utility/ProtectedRoute";
import Layout from "../components/layout/Layout";
import CarManagement from "../views/company/carManagement/CarManagement";
import DriverManager from "../views/company/driverManager/DriverManager";
import GlobalReqDetails from "../views/company/globalRequest/components/GlobalReqDetails";
import GlobalRequestHome from "../views/company/globalRequest/components/GlobalRequestHome";
import GlobalRequest from "../views/company/globalRequest/GlobalRequest";
import ShiftDetails from "../views/company/shiftManager/components/ShiftDetails";
import ShiftList from "../views/company/shiftManager/components/ShiftList";
import ShiftManager from "../views/company/shiftManager/ShiftManager";

export const companyRouteMapper = [
    {
        path: "/global-request",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Layout><GlobalRequest /></Layout>,
                children: [
                    { path: "", element: <GlobalRequestHome /> },
                    { path: "details/:request_id", element: <GlobalReqDetails /> },
                ]
            },


        ],
    },
    {
        path: "/shift-manager",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <Layout><ShiftManager /></Layout>,
                children: [
                    { path: "", element: <ShiftList /> },
                    { path: "details/:shift_id", element: <ShiftDetails /> },
                ]
            },

        ],
    },
    {
        path: "/car-manager",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><CarManagement /></Layout> },

        ],
    },

    {
        path: "/driver-manager",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><DriverManager /></Layout> },

        ],
    },


]