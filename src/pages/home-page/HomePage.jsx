import HeaderPages from "@/components/HeaderPages";
import ProductListComponent from "@/components/products/product-list/ProductListComponent";
import { MODE_LIST_PRODUCTS, TITLE_PAGES } from "@/constants/contants";
import { Grid2 } from "@mui/material";

const HomePage = () => {
    return (
        <Grid2
            direction="column"
            container
            spacing={2}
            padding="2"
            width="100%"
            height="100%"
            alignItems="start"
            justifyContent="center"
        >
            <Grid2 width="100%">
                <HeaderPages title={TITLE_PAGES.LIST_PRODUCTS} />
            </Grid2>
            <Grid2 width="100%">
                <ProductListComponent mode={MODE_LIST_PRODUCTS.VIEW} />
            </Grid2>
        </Grid2>
    );
};

export default HomePage;
