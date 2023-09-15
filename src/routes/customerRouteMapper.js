import ProtectedRoute from "../app/utility/ProtectedRoute";
import Layout from "../components/layout/Layout";
import FavoriteCompanies from "../views/customer/favoriteCompanies/FavoriteCompanies";

export const customerRouteMapper = [
    {
        path: "/favorite-companies",
        element: <ProtectedRoute />,
        children: [
            { path: "", element: <Layout><FavoriteCompanies /></Layout> },

        ],
    },
];