import ProtectedRoute from "../app/utility/ProtectedRoute";
import Layout from "../components/layout/Layout";
import PlayGround from "../views/others/test/PlayGround";

export const testRouteMapper = [
    {
        path: "/play",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><PlayGround /></Layout> },

        ],
    },
]