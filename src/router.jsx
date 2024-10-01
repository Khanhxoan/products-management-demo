import {
  lazy,
  Suspense,
} from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import DefaultLayout from '@/layouts/default-layout/DefaultLayout';

import RootLayout from './layouts/root-layout/RootLayout';

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

const routeList = [
    {
        id: 1,
        path: "/",
        element: withSuspense(<HomePage />),
    },
    {
        id: 2,
        path: "products",
        element: withSuspense(<ManageProductsPage />),
    },
    {
        id: 3,
        path: "products/create",
        element: withSuspense(<CreateProductPage />),
    },
    {
        id: 4,
        path: "products/:productId",
        element: withSuspense(<ProductDetailPage />),
    },
    {
        id: 5,
        path: "products/:productId/update",
        element: withSuspense(<UpdateProductPage />),
    },
];

const getRouteList = () => {
    return createBrowserRouter(
        createRoutesFromElements(
            <Route element={<RootLayout />}>
                <Route path="login" element={withSuspense(<LoginPage />)} />
                <Route path="/" element={<DefaultLayout />}>
                    {routeList.map((route) => (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
                {/* Page not found */}
                <Route path="*" element={withSuspense(<Error404 />)} />
            </Route>
        )
    );
};

export default getRouteList;
