import { useEffect } from 'react';

import {
  Controller,
  useForm,
} from 'react-hook-form';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import * as yup from 'yup';

import { notify } from '@/components/custom-toast/custom-toast';
import {
  msgRequired,
  TOAST_STATUS,
} from '@/constants/contants';
import { loginThunk } from '@/stores/authSlice/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import {
  Grid2,
  TextField,
  Typography,
} from '@mui/material';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loadingLogin, user } = useSelector((state) => state.auth);
    const loginFormSchema = yup.object().shape({
        username: yup.string().required(msgRequired),
        password: yup.string().required(msgRequired),
    });
    const { control, setValue, handleSubmit } = useForm({
        defaultValues: { username: "", password: "" },
        resolver: yupResolver(loginFormSchema),
    });

    useEffect(() => {
        if (!!user?.username) {
            navigate("/");
        }
    }, [user]);

    const onSubmit = async (data) => {
        const payloadLogin = { ...data };
        try {
            const resultAction = await dispatch(loginThunk(payloadLogin));
            if (loginThunk.fulfilled.match(resultAction)) {
                notify("Login successfully!", TOAST_STATUS.SUCCESS);
                navigate("/");
            }
            if (loginThunk.rejected.match(resultAction)) {
                notify("Login fail!", TOAST_STATUS.ERORR);
            }
        } catch (err) {
            notify("Login fail!", TOAST_STATUS.ERORR);
        }
    };

    return (
        <Grid2 container justifyContent="center" alignItems="center" width="100%" height="100%">
            <form>
                <Grid2
                    container
                    padding="30px"
                    direction="column"
                    gap="50px"
                    minWidth="400px"
                    sx={{ boxShadow: 2, borderRadius: "8px" }}
                >
                    <Typography variant="h5" fontWeight="600" textAlign="center" color="#2196f3">
                        LOGIN TO MANAGE
                    </Typography>
                    <Grid2 container direction="column" gap="20px">
                        <Controller
                            control={control}
                            name="username"
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        id="outlined-basic"
                                        label="Username"
                                        variant="outlined"
                                        required
                                        error={!!fieldState.error}
                                        value={field.value}
                                        helperText={fieldState?.error?.message}
                                        onChange={(e) => {
                                            setValue("username", e.target.value ?? "");
                                        }}
                                    />
                                );
                            }}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => {
                                return (
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        variant="outlined"
                                        required
                                        error={!!fieldState.error}
                                        value={field.value}
                                        helperText={fieldState?.error?.message}
                                        type="password"
                                        onChange={(e) => {
                                            setValue("password", e.target.value ?? "");
                                        }}
                                    />
                                );
                            }}
                        />
                        <Grid2 container gap="20px" justifyContent="space-between" alignItems="center" marginTop="20px">
                            <Link>Click to register</Link>
                            <LoadingButton
                                variant="contained"
                                sx={{ px: "30px" }}
                                endIcon={<LoginIcon />}
                                loadingPosition="end"
                                loading={loadingLogin}
                                onClick={handleSubmit(onSubmit)}
                            >
                                Login
                            </LoadingButton>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </form>
        </Grid2>
    );
};

export default LoginPage;
