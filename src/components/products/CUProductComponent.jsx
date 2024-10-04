import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import {
    CategoryOptions,
    convertMoneyToNumber,
    convertNumberToMoney,
    MODE_PRODUCT_FORM,
    msgRequired,
    TOAST_STATUS,
} from "@/constants/contants";
import { createProductThunk, updateFormValueCU, updateProductThunk } from "@/stores/productSlice/productSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import { notify } from "../custom-toast/custom-toast";

const CUProductComponent = ({ mode }) => {
    const dispatch = useDispatch();
    const { productForm, productDetail, loadingCU } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const { productId } = useParams();
    const isUpdate = mode === MODE_PRODUCT_FORM.UPDATE;

    const formSchema = yup.object().shape({
        productName: yup.string().required(msgRequired),
        information: yup.string().required(msgRequired),
        category: yup.string().required(msgRequired),
        price: yup.number().required(msgRequired),
        imgUrl: yup.string(),
    });

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: isUpdate
            ? {
                  productName: productDetail.productName,
                  category: productDetail.category,
                  imgUrl: productDetail.imgUrl,
                  information: productDetail.information,
                  price: productDetail.price,
              }
            : productForm,
        resolver: yupResolver(formSchema),
        reValidateMode: "onSubmit",
    });

    const handleCreateProduct = async (data) => {
        const payload = { ...data, _id: undefined };
        try {
            const resultAction = await dispatch(createProductThunk(payload));
            if (createProductThunk.fulfilled.match(resultAction)) {
                notify("Create product success!", TOAST_STATUS.SUCCESS);
                navigate("/products");
            }
        } catch (err) {
            notify("Create product fail!", TOAST_STATUS.ERORR);
        }
    };

    const handleUpdateProduct = async (data) => {
        const payloadUpdate = {
            productName: data.productName,
            category: data.category,
            imgUrl: data.imgUrl,
            information: data.information,
            price: data.price,
        };
        try {
            const resultAction = await dispatch(updateProductThunk({ productId, payloadUpdate }));
            if (updateProductThunk.fulfilled.match(resultAction)) {
                notify("Update product success!", TOAST_STATUS.SUCCESS);
                navigate("/products");
            }
        } catch (err) {
            notify("Updare product fail!", TOAST_STATUS.ERORR);
        }
    };

    const handleSaveFieldValue = (field, value) => {
        dispatch(
            updateFormValueCU({
                ...productForm,
                [field]: value,
            })
        );
    };
    const handleChangeFieldValue = (field, value) => {
        setValue(field, value);
    };

    const onSubmit = (data) => {
        if (isUpdate) {
            handleUpdateProduct(data);
        } else {
            handleCreateProduct(data);
        }
    };

    return (
        <form style={{ width: "100%" }}>
            <Grid2 container direction="column" gap="30px">
                <Grid2 container direction="row" padding="20px">
                    <Grid2
                        flex={1}
                        container
                        direction="column"
                        justifyContent="start"
                        padding="20px"
                        paddingTop="40px"
                        paddingBottom="40px"
                        gap="30px"
                    >
                        <Typography
                            variant="h6"
                            fontWeight="600"
                            textAlign="center"
                            textTransform="uppercase"
                            color="#00695f"
                        >
                            Product information
                        </Typography>
                        <Controller
                            name="productName"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        required
                                        id="standard-basic"
                                        label="Product name"
                                        variant="standard"
                                        error={!!fieldState?.error}
                                        value={field.value ?? ""}
                                        onChange={(e) => {
                                            if (!isUpdate) {
                                                handleSaveFieldValue("productName", e.target.value);
                                            }
                                            handleChangeFieldValue("productName", e.target.value);
                                        }}
                                        helperText={fieldState?.error?.message ?? ""}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormControl>
                                        <InputLabel id="category-label" error={!!fieldState?.error} required>
                                            Category
                                        </InputLabel>
                                        <Select
                                            required
                                            labelId="category-label"
                                            input={<OutlinedInput label="Category" />}
                                            value={field.value ?? ""}
                                            error={!!fieldState?.error}
                                            onChange={(e) => {
                                                if (!isUpdate) {
                                                    handleSaveFieldValue("category", e.target.value);
                                                }
                                                handleChangeFieldValue("category", e.target.value);
                                            }}
                                            helperText={fieldState?.error?.message ?? ""}
                                        >
                                            {CategoryOptions.map((category) => (
                                                <MenuItem key={category} value={category}>
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="information"
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        required
                                        id="standard-basic"
                                        label="Information product"
                                        variant="standard"
                                        value={field.value ?? ""}
                                        error={!!fieldState?.error}
                                        helperText={fieldState?.error?.message ?? ""}
                                        onChange={(e) => {
                                            if (!isUpdate) {
                                                handleSaveFieldValue("information", e.target.value);
                                            }
                                            handleChangeFieldValue("information", e.target.value);
                                        }}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="price"
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        required
                                        id="standard-basic"
                                        type="text"
                                        label="Price"
                                        error={!!fieldState?.error}
                                        helperText={fieldState?.error?.message ?? ""}
                                        value={convertNumberToMoney(field.value)}
                                        variant="standard"
                                        onChange={(e) => {
                                            if (!isUpdate) {
                                                handleSaveFieldValue("price", convertMoneyToNumber(e.target.value));
                                            }
                                            handleChangeFieldValue("price", convertMoneyToNumber(e.target.value));
                                        }}
                                    />
                                );
                            }}
                        />
                    </Grid2>
                    <Grid2
                        container
                        direction="column"
                        width="100%"
                        borderLeft="1px solid grey"
                        paddingLeft="20px"
                        flex={1}
                        justifyContent="space-between"
                        paddingTop="40px"
                        paddingBottom="40px"
                        gap="30px"
                    >
                        <Controller
                            control={control}
                            name="imgUrl"
                            render={({ field }) => {
                                return (
                                    <>
                                        <img
                                            height={400}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s)";
                                            }}
                                            style={{
                                                maxWidth: "500px",
                                            }}
                                            width="fit-content"
                                            src={field.value}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            label="Image Url"
                                            variant="standard"
                                            value={field?.value ?? ""}
                                            type="url"
                                            onChange={(e) => {
                                                if (!isUpdate) {
                                                    handleSaveFieldValue("imgUrl", e.target.value);
                                                }
                                                handleChangeFieldValue("imgUrl", e.target.value);
                                            }}
                                        />
                                    </>
                                );
                            }}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 container direction={"row"} width="100%" justifyContent={"center"} gap="20px">
                    <Button variant="outlined">Cancel</Button>
                    <LoadingButton
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        loading={loadingCU}
                        sx={{ paddingX: "30px" }}
                        endIcon={<SaveIcon />}
                        loadingPosition="end"
                    >
                        Submit
                    </LoadingButton>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default CUProductComponent;
