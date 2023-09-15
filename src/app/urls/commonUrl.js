// ! Auth Urls
export const kuAuthUser = "/auth/user";
export const kuLogin = "/auth/login";
export const kuRegister = "/auth/register";
export const kuAuthVerify = "/auth/verify";
export const kuFpOtpVerify = "/auth/forget-password-otp-verify";
export const kuForgetPassword = "/auth/forget-password";
export const kuResetPassword = "/auth/reset-password";
export const kuSetDeviceToken = "/common/set-device-token";
// opt verification
export const kuResendOtp = "/auth/resend-otp";
export const kuLogout = "/auth/logout";

//here address search
export const kuSearchAddressSuggestion = "https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=" + process.env.REACT_APP_HERE_API_KEY + "&q=";
export const kuSearchAddressLatLang = "https://geocode.search.hereapi.com/v1/geocode?apiKey=" + process.env.REACT_APP_HERE_API_KEY + "&q=";

//? settings page[push notification, email notification,
//? change password, language, Company Policy, faq]
export const kuChangePassword = "/common/settings/change-password";
export const kuGetFaq = "/common/get-faq";
export const kuGetTermsAndCondition = "/common/get-terms-gdpr";
export const kuGetToggleEmailPushNotificationState = "/common/settings/get-notification-toggle-state";
export const kuToggleEmailPushNotification = "/common/settings/notification-toggle";
export const kuContactLimadi = "/common/contact-limadi";
export const kuGetTermsGdpr = "/common/get-terms-gdpr";
export const kuGetProfileDetails = "/common/profile/get";
export const kuEditProfile = "/common/profile/update";
export const kuGetTerms = "/common/get-company-terms";

//? profile and update
export const kuUpdateTerms = "/common/update-company-term";
export const kuAddTerms = "/common/add-term-gdpr";
export const kuRatingAndReview = "/general/rating-and-review/company";


// notifications
export const kuGetNotification = "/common/notification";
export const kuGetTableViewNotification = "/common/web/notification";
export const kuNotificationSeen = "/common/notification/show";


//? favorite address
export const kuGetFavoriteAddress = "/common/get-fav-address";
export const kuFavoriteAddressList = "/common/web/get-fav-address";
export const kuAddFavoriteAddress = "/common/add-fav-address";
export const kuUpdateFavoriteAddress = "/common/update-fav-address";
export const kuDeleteFavoriteAddress = "/common/remove-fav-address";
// others
export const kuSetLanguage = "/common/set-language";
export const kuGetDeleteAccountRequirements = "/common/get-user-delete-requirement";
export const kuDeleteUserAccount = "/common/profile/delete";


// request
export const kuGetInitData = "/request/get-init-data";
export const kuSearchCompany = "/request/search-company";
export const kuGetRequests = "/request/index";
export const kuGetRequestsNew = "/web/request/index"; //for table view data
export const kuRequestDetails = "/request/show";
export const kuRequestSave = "/request/create";
export const kuRequestDelete = "/request/delete";
export const kuEditInBidding = "/request/in-bidding/edit";
export const kuAwardRequest = "/request/invitation/bidding/award";
export const kuRequestAction = "/request/cancel/action";
export const kuCancelRequestInvitation = "/request/invitation/decline";
export const kuSubmitRequestInvitationBidding = "/request/invitation/bidding/add";
export const kuUpdateRequestInvitationBidding = "/request/invitation/bidding/edit";
export const kuDeleteRequestInvitationBidding = "/request/invitation/bidding/cancel";
export const kuNotPlannedShiftAssign = "/request/invitation/bidding/assign-shift";
export const kuRequestAcknowledge = "/request/acknowledge";

export const kuShiftPlannerList = "/shift/index";
export const kuAvailableShift = "/request/get-request-shift";
export const kuShiftPlannerDetails = "/shift/show";
//
export const kuCommonHome = "/common/home";

//e         settings
export const kuCommonToggleAdminAccess = "/common/settings/admin-access";

//l             express login
export const kuCommonExpressLogin = "/auth/user-access";
