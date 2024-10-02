import { useNavigate } from 'react-router-dom';

import HeaderPages from '@/components/HeaderPages';
import ProductListComponent
  from '@/components/products/product-list/ProductListComponent';
import {
  MODE_LIST_PRODUCTS,
  TITLE_PAGES,
} from '@/constants/contants';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Grid2,
} from '@mui/material';

const ManageProductsPage = () => {
    const navigate = useNavigate();
    return (
        <Grid2
            direction="row"
            container
            spacing={2}
            padding="2"
            width="100%"
            height="100%"
            alignItems="start"
            justifyContent="center"
        >
            <Grid2 container width="100%" justifyContent="space-between">
                <HeaderPages title={TITLE_PAGES.MANAGE_PRODUCTS} />
                <Button
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "#48567d",
                        color: "white",
                        marginRight: "20px",
                    }}
                    onClick={() => navigate("create")}
                >
                    Add new
                </Button>
            </Grid2>
            <Grid2 width="100%">
                <ProductListComponent mode={MODE_LIST_PRODUCTS.MANAGE} />
            </Grid2>
        </Grid2>
    );
};

export default ManageProductsPage;
