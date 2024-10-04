import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { ROLE_USERS } from '@/constants/contants';
import { getProductDetailThunk } from '@/stores/productSlice/productSlice';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Button,
  CircularProgress,
  Grid2,
  Typography,
} from '@mui/material';

const ProductDetailComponent = () => {
    const { user } = useSelector((state) => state.auth);
    const isAdmin = String(user?.role).toUpperCase() === ROLE_USERS.ADMIN;
    const navigate = useNavigate();
    const { loadingDetailProduct, errorGetDetail, productDetail } = useSelector((state) => state.products);
    const { productId } = useParams();
    const dispactch = useDispatch();

    useEffect(() => {
        if (!productDetail._id || productDetail._id !== productId) {
            dispactch(getProductDetailThunk(productId));
        }
    }, []);

    if (loadingDetailProduct) {
        return (
            <Grid2
                direction="column"
                container
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
                gap="30px"
            >
                <CircularProgress size={80} />
                <Typography variant="h4" fontWeight={500} textAlign="center">
                    Fetching Data
                </Typography>
            </Grid2>
        );
    }

    if (errorGetDetail && !productDetail._id) {
        return (
            <Typography variant="h4" fontWeight={500} textAlign="center">
                Not found product!
            </Typography>
        );
    }

    return (
        <Grid2 container direction="row" padding="20px">
            <Grid2 flex={1} container justifyContent="center">
                <img src={productDetail.imgUrl} height={500} style={{ maxWidth: "600px" }} width="fit-content" alt="" />
            </Grid2>
            <Grid2
                container
                direction="column"
                borderLeft="1px solid grey"
                paddingLeft="20px"
                flex={1}
                justifyContent="space-between"
                paddingTop="40px"
                paddingBottom="40px"
            >
                <Grid2 direction="column" gap="10px" container>
                    <Typography variant="h3" fontWeight={600} color="#48567d">
                        {productDetail.productName}
                    </Typography>
                    <Typography variant="h6" fontWeight={400} color="#087c12" fontStyle="italic">
                        Prices and promotions at: Ha Noi
                    </Typography>
                    <Grid2 container direction="column">
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography variant="h6" fontSize="18px" fontWeight={600}>
                                Description:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetail.information}
                            </Typography>
                        </Grid2>
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography variant="h6" fontSize="18px" fontWeight={600}>
                                Category:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetail.category}
                            </Typography>
                        </Grid2>
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography variant="h6" fontSize="18px" fontWeight={600}>
                                Price:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetail.price.toLocaleString("en-US")} VND
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2>
                    {!isAdmin ? (
                        <Button variant="outlined" startIcon={<ShoppingCartIcon />} onClick={() => navigate("/")}>
                            Add to card
                        </Button>
                    ) : (
                        <Button variant="outlined" endIcon={<EditIcon />} onClick={() => navigate("update")}>
                            Edit product
                        </Button>
                    )}
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default ProductDetailComponent;
