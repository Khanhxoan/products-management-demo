export const TITLE_PAGES = {
    CREATE_PRODUCT: "ADD NEW PRODUCT",
    MANAGE_PRODUCTS: "MANAGE LIST PRODUCTS",
    UPDATE_PRODUCT: "UPDATE PRODUCT",
    PRODUCT_DETAIL: "PRODUCT DETAILS",
    LIST_PRODUCTS: "LIST PRODUCTS",
};

export const ROLE_USERS = {
    USER: "USER",
    ADMIN: "ADMIN",
};

export const MODE_LIST_PRODUCTS = {
    VIEW: "VIEW",
    MANAGE: "MANAGE",
};

export const MODE_PRODUCT_FORM = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
};

export const CategoryOptions = ["Phone", "Laptop", "Watch", "Tablet", "Accessory"];

export const msgRequired = "Missing required field.";
export const initFormValue = {
    category: "Phone",
};

export const convertNumberToMoney = (value) => {
    return value ? Number(value).toLocaleString("en-US") : "";
};
export const convertMoneyToNumber = (value) => {
    return Number(value.replace(/,/g, ""));
};

export const TOAST_STATUS = {
    SUCCESS: "success",
    ERORR: "error",
};

export const columns = [
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
