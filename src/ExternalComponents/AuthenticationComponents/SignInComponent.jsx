import React, { useRef, useEffect } from "react";
import {
  useForm,
  InputText,
  Button,
  Message,
  FloatLabel,
} from "./../../CommonImports/commonImports";
import PrimeToast from "../../CommonComponents/PrimeToast";
import { ERROR as errorType, SUCCESS } from "../../Constants/SharedConstants";
import { useSelector, useDispatch } from "react-redux";
import signIn, {
  getAdminUserList,
  getUserList,
} from "../../Services/CommonService/CommonService";
import { fetchLoginUserDetails, fetchUserList } from "../../redux/actions/UserDetailsAction";
const SignInComponent = ({ handleLoginSuccessEvent }) => {
  const dispatch = useDispatch();
  const { loading, loginUserDetails, error, userList } = useSelector(
    (store) => store.userDetails
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toastRef = useRef(null);
  useEffect(() => {
    console.log("loginUserDetails --" + loginUserDetails)
    console.log(loginUserDetails)
    if (
      loginUserDetails?.validateUser !== undefined &&
      loginUserDetails?.validateUser !== null
    ) {
      if (loginUserDetails?.validateUser) {
        localStorage.setItem('authtoken', loginUserDetails.authToken);
        if (toastRef.current) {
          const msg = {
            msgType: SUCCESS,
            detail: "Login Successful!",
          };
          toastRef.current.show(msg);
        }
        handleLoginSuccessEvent(true);
        dispatch(fetchUserList());
       //  const res =   getAdminUserList();
      // test();
      
        
      } else {
        const msg = {
          msgType: errorType,
          detail: "Invalid credentials!",
        };
        toastRef.current.show(msg);
      }
    }
  }, [loginUserDetails]);

  useEffect(() => {
    if (userList?.lenght) {
      console.log(userList);
    }
  }, [userList]);
  const test = async () => {
   const res2 = await  getUserList();
  }
  const onSubmit = async (data) => {
    console.log("Login Successful:", data);
    const loginAuth = {
      email: data.email,
      password: data.password,
    };
   // const res = await  signIn(loginAuth);
  
    dispatch(fetchLoginUserDetails(loginAuth));
   // handleLoginSuccessEvent(true);
  };

  return (
    <>
      <div className="p-card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Sign In</h2>
        <PrimeToast ref={toastRef} />
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="p-field mb-3">
            <FloatLabel>
              <InputText
                id="email"
                className={`p-inputtext p-component w-100 ${
                  errors.email ? "p-invalid" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <label htmlFor="email" className="p-text-bold">
                Email
              </label>
            </FloatLabel>
            {errors.email && (
              <Message severity="error" text={errors.email.message} />
            )}
          </div>

          {/* Password Field */}
          <div className="p-field mb-3">
            <FloatLabel>
              <label htmlFor="password" className="p-text-bold">
                Password
              </label>
              <InputText
                id="password"
                type="password"
                className={`p-inputtext p-component w-100 ${
                  errors.password ? "p-invalid" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </FloatLabel>
            {errors.password && (
              <Message severity="error" text={errors.password.message} />
            )}
          </div>

          {/* Submit Button */}
          <Button
            label="Sign In"
            type="submit"
            className="w-100 p-button-primary"
          />
        </form>
      </div>
    </>
  );
};

export default SignInComponent;
