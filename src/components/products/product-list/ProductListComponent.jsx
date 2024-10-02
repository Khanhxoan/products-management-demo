import {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MODE_LIST_PRODUCTS } from '@/constants/contants';
import {
  getProductDetailAction,
  getProductsThunk,
} from '@/stores/productSlice/productSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button,
  CircularProgress,
  Grid2,
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

const columns = [
    { id: "productName", label: "Product", minWidth: 170 },
    { id: "category", label: "Category", minWidth: 100 },
    { id: "imgUrl", label: "Image", minWidth: 60 },
    {
        id: "information",
        label: "Information",
        minWidth: 170,
    },
    {
        id: "price",
        label: "Price",
        minWidth: 60,
        align: "right",
        format: (value) => `${value.toLocaleString("en-US")} VND`,
    },
    {
        id: "action",
        label: "Actions",
        minWidth: 170,
        align: "center",
    },
];

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loadingGetProducts, error } = useSelector(
        (state) => state.products
    );

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

    if (loadingGetProducts) {
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
            <TableContainer sx={{ maxHeight: "700px", minHeight: "500px" }}>
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
                        {products
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        sx={{ height: "60px" }}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "imgUrl") {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <img
                                                            src={row[column.id]}
                                                            height="40px"
                                                            width="fit-content"
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === "action") {
                                                const productId = row["_id"];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <Button
                                                            sx={{
                                                                minWidth:
                                                                    "40px",
                                                            }}
                                                            onClick={() => {
                                                                const productDetail =
                                                                    { ...row };
                                                                dispatch(
                                                                    getProductDetailAction(
                                                                        productDetail
                                                                    )
                                                                );
                                                                const route =
                                                                    isManage
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
                                                                        minWidth:
                                                                            "40px",
                                                                    }}
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `${productId}/update`
                                                                        )
                                                                    }
                                                                >
                                                                    <EditIcon />
                                                                </Button>
                                                                <Button
                                                                    sx={{
                                                                        minWidth:
                                                                            "40px",
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
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
        </Paper>
    );
};

export default ProductListComponent;
