import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomDialog from '@/components/custom-dialog/CustomDialog';
import { notify } from '@/components/custom-toast/custom-toast';
import LoadingComponent from '@/components/loading-component/LoadingComponent';
import {
  columns,
  MODE_LIST_PRODUCTS,
  TOAST_STATUS,
} from '@/constants/contants';
import {
  deleteProductThunk,
  getProductDetailAction,
  getProductsThunk,
} from '@/stores/productSlice/productSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  styled,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#48567d",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ProductListComponent = ({ mode }) => {
    const isManage = mode === MODE_LIST_PRODUCTS.MANAGE;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
    const [productDeleted, setProductDeleted] = useState({ productId: "", productName: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loadingGetProducts, error, loadingDelete } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmitDeleteProduct = useCallback(async () => {
        try {
            const resultAction = await dispatch(deleteProductThunk(productDeleted.productId));
            if (deleteProductThunk.fulfilled.match(resultAction)) {
                notify("Delete product success!", TOAST_STATUS.SUCCESS);
                setIsOpenDeleteDialog(false);
            }
        } catch (err) {
            notify("Delete product fail!", TOAST_STATUS.ERORR);
        }
    });

    if (loadingGetProducts) {
        return <LoadingComponent contentLoading="Fetching Data" />;
    }

    if (loadingDelete) {
        return <LoadingComponent contentLoading="Deleting product" />;
    }

    if ((products ?? []).length === 0) {
        return (
            <Typography variant="h4" fontWeight={500} textAlign="center">
                No products
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography variant="h4" fontWeight={500} textAlign="center">
                Error in fetching data
            </Typography>
        );
    }
    return (
        <Paper
            sx={{
                width: "100%",
                overflow: "hidden",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#dadfe8",
            }}
        >
            <TableContainer sx={{ maxHeight: "600px", minHeight: "500px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row["_id"]} sx={{ height: "60px" }}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === "imgUrl") {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <img src={row[column.id]} height="40px" width="fit-content" />
                                                </TableCell>
                                            );
                                        }
                                        if (column.id === "action") {
                                            const productId = row["_id"];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Button
                                                        sx={{
                                                            minWidth: "40px",
                                                        }}
                                                        onClick={() => {
                                                            dispatch(
                                                                getProductDetailAction({
                                                                    ...row,
                                                                })
                                                            );
                                                            const route = isManage
                                                                ? `${productId}`
                                                                : `products/${productId}`;
                                                            navigate(route);
                                                        }}
                                                    >
                                                        <VisibilityIcon />
                                                    </Button>
                                                    {isManage && (
                                                        <>
                                                            <Button
                                                                sx={{
                                                                    minWidth: "40px",
                                                                }}
                                                                onClick={() => {
                                                                    dispatch(
                                                                        getProductDetailAction({
                                                                            ...row,
                                                                        })
                                                                    );
                                                                    navigate(`${productId}/update`);
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </Button>
                                                            {
                                                                <LoadingButton
                                                                    loading={loadingDelete && productId}
                                                                    endIcon={<DeleteIcon />}
                                                                    loadingPosition="end"
                                                                    sx={{
                                                                        minWidth: "40px",
                                                                        span: { marginLeft: 0 },
                                                                    }}
                                                                    onClick={() => {
                                                                        setProductDeleted({
                                                                            productId: row["_id"],
                                                                            productName: row["productName"],
                                                                        });
                                                                        setIsOpenDeleteDialog(true);
                                                                    }}
                                                                ></LoadingButton>
                                                            }
                                                        </>
                                                    )}
                                                </TableCell>
                                            );
                                        }
                                        if (column.id === "productName") {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    <Typography fontSize="0.875rem" fontWeight="600">
                                                        {value}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(products ?? []).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CustomDialog
                open={isOpenDeleteDialog}
                handleClose={() => setIsOpenDeleteDialog(false)}
                dialogTitle="Are you sure to delete this product?"
                dialogContent={`Product: ${productDeleted.productName}`}
                handleSubmit={handleSubmitDeleteProduct}
            />
        </Paper>
    );
};

export default ProductListComponent;
