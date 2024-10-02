import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Button,
  CircularProgress,
  Grid2,
  Typography,
} from '@mui/material';

const ProductDetailComponent = ({ productDetailData }) => {
    const isAdmin = true;
    const navigate = useNavigate();
    const { loadingDetailProduct } = useSelector((state) => state.products);

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

    return (
        <Grid2 container direction="row" padding="20px">
            <Grid2 flex={1} container justifyContent="center">
                <img
                    src={productDetailData.imgUrl}
                    height={500}
                    style={{ maxWidth: "600px" }}
                    width="fit-content"
                    alt=""
                />
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
                        {productDetailData.productName}
                    </Typography>
                    <Typography
                        variant="h6"
                        fontWeight={400}
                        color="#087c12"
                        fontStyle="italic"
                    >
                        Prices and promotions at: Ha Noi
                    </Typography>
                    <Grid2 container direction="column">
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography
                                variant="h6"
                                fontSize="18px"
                                fontWeight={600}
                            >
                                Description:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetailData.information}
                            </Typography>
                        </Grid2>
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography
                                variant="h6"
                                fontSize="18px"
                                fontWeight={600}
                            >
                                Category:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetailData.category}
                            </Typography>
                        </Grid2>
                        <Grid2 container alignItems="center" gap="10px">
                            <Typography
                                variant="h6"
                                fontSize="18px"
                                fontWeight={600}
                            >
                                Price:
                            </Typography>
                            <Typography variant="h6" fontSize="18px">
                                {productDetailData.price.toLocaleString(
                                    "en-US"
                                )}{" "}
                                VND
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2>
                    {!isAdmin ? (
                        <Button
                            variant="outlined"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => navigate("/")}
                        >
                            Add to card
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            endIcon={<EditIcon />}
                            onClick={() => navigate("update")}
                        >
                            Edit product
                        </Button>
                    )}
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default ProductDetailComponent;
