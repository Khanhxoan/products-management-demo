import {
  lazy,
  Suspense,
} from 'react';

import {
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import DefaultLayout from '@/layouts/default-layout/DefaultLayout';

const LoginPage = lazy(() => import("@/pages/login-page"));
const HomePage = lazy(() => import("@/pages/home-page"));
const Error404 = lazy(() => import("@/pages/not-found-page"));
const CreateProductPage = lazy(() => import("@/pages/create-product-page"));
const UpdateProductPage = lazy(() => import("@/pages/update-product-page"));
const ProductDetailPage = lazy(() => import("@/pages/product-detail-page"));
const ManageProductsPage = lazy(() => import("@/pages/manage-products-page"));

const withSuspense = (node, fallback) => {
    return <Suspense fallback={fallback}>{node}</Suspense>;
};

const CheckPermissionRole = ({ element }) => {
    const isAdmin = true;
    if (isAdmin) {
        return element;
    } else {
        return <Navigate to="/" replace />;
    }
};

const routeList = [
    {
        path: "/login",
        element: withSuspense(<LoginPage />),
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: withSuspense(<HomePage />),
            },
            {
                path: "products",
                element: (
                    <CheckPermissionRole
                        element={withSuspense(<ManageProductsPage />)}
                    />
                ),
            },
            {
                path: "products/create",
                element: (
                    <CheckPermissionRole
                        element={withSuspense(<CreateProductPage />)}
                    />
                ),
            },
            {
                path: "products/:productId",
                element: withSuspense(<ProductDetailPage />),
            },
            {
                path: "products/:productId/update",
                element: (
                    <CheckPermissionRole
                        element={withSuspense(<UpdateProductPage />)}
                    />
                ),
            },
        ],
    },
    {
        path: "*",
        element: withSuspense(<Error404 />),
    },
];

const getRouteList = () => {
    return createBrowserRouter(routeList);
};

export default getRouteList;
