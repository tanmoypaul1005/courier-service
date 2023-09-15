// ! Auth Urls
export const auth_user_url = "/auth/user";
export const login_url = "/auth/login";
export const register_url = "/auth/register";
export const kuAuthVerify = "/auth/verify";
export const kuFpOtpVerify = "/auth/forget-password-otp-verify";
export const kuForgetPassword = "/auth/forget-password";
export const kuResetPassword = "/auth/reset-password";
export const kuSetDeviceToken = "/common/set-device-token";
// opt verification
export const kuResendOtp = "/auth/resend-otp";

//e     :: shift management
export const kuAllShift = "/shift/index";
export const kuShiftManagerTableData = "/shift/web/index";
export const kuAllCarsAndDriversList = "/shift/get-cars-and-drivers";
export const kuFilterCarsAndDriversList = "/shift/get-all-cars-and-drivers-web";
export const kuAddNewShift = "/shift/add";
export const kuShiftDetails = "/shift/show";
export const kuUpdateShift = "/shift/update";
export const kuGetShiftRouteList = "/route/get-list";
export const kuDeleteShift = "/shift/delete";
export const kuFastCalculation = "/route-distance-calculate"; // request id required
export const kuAdvanceCalculation = "/request/advance-calculate"; // request id & shift id required

//b     global request
export const kuGlobalRequestIndex = "/company/cloud-request/request-search";
export const kuGlobalRequestTableIndex = "/company/global-request/web/request-search";
export const kuGlobalRequestFilterList = "/company/filter-management/get-filters";


//e     :: car management
export const kuAllCar = "/company/car-management/all-cars";
export const kuAllCarTableData = "/company/car-management/web/all-cars";
export const kuAddCar = "/company/car-management/add-car";
export const kuUpdateCar = "/company/car-management/update-car";
export const kuDeleteCar = "/company/car-management/delete-car";
export const kuGetCarLicense = "/admin/license/?flag=user";
export const kuRenewCarLicense = "/company/car-management/renew-car-license";

//* info:: driver management
export const kuDriverList = "/company/driver-management/all-drivers";
export const kuDriverTableData = "/company/driver-management/web/all-drivers";
export const kuAddDriver = "/company/driver-management/add-driver";
export const kuEditDriver = "/company/driver-management/update-driver";
export const kuDeleteDriver = "/company/driver-management/delete-driver";

