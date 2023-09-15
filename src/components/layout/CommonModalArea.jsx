import React from 'react';
import RequestConfirmModal from '../../views/common/createRequest/components/RequestConfirmModal';
import AddFavoriteAddressModal from '../../views/common/favoriteAddress/modal/AddFavoriteAddressModal';
import AddressDetailsModal from '../../views/common/favoriteAddress/modal/AddressDetailsModal';
import EditFavoriteAddressModal from '../../views/common/favoriteAddress/modal/EditFavoriteAddressModal';
import FavoriteAddressDeleteModal from '../../views/common/favoriteAddress/modal/FavoriteAddressDeleteModal';
import NotificationDetailsModal from '../../views/common/notification/modal/NotificationDetailsModal';
import DeleteAccountModal from '../../views/common/settings/profile/modal/DeleteAccountModal';
import EditAboutCompanyModal from '../../views/common/settings/profile/modal/EditAboutCompanyModal';
import EditCompanyPolicyModal from '../../views/common/settings/profile/modal/EditCompanyPolicyModal';
import EditCustomerProfileModal from '../../views/common/settings/profile/modal/EditCustomerProfileModal';
import AddCarModal from '../../views/company/carManagement/modal/AddCarModal';
import CarDeleteModal from '../../views/company/carManagement/modal/CarDeleteModal';
import CarLicensePackageModal from '../../views/company/carManagement/modal/CarLicensePackageModal';
import EditCarModal from '../../views/company/carManagement/modal/EditCarModal';
import AddDriverModal from '../../views/company/driverManager/modal/AddDriverModal';
import DriverDeleteModal from '../../views/company/driverManager/modal/DriverDeleteModal';
import EditDriverModal from '../../views/company/driverManager/modal/EditDriverModal';
import FilterGlobalRequest from '../../views/company/globalRequest/components/modals/FilterGlobalRequest';
import AddShift from '../../views/company/shiftManager/components/Modal/AddShift';
import ConfirmDeleteShift from '../../views/company/shiftManager/components/Modal/ConfirmDeleteShift';
import CustomStopDetails from '../../views/company/shiftManager/components/Modal/CustomStopDetails';
import EditShift from '../../views/company/shiftManager/components/Modal/EditShift';
import FilterShift from '../../views/company/shiftManager/components/Modal/FilterShift';
import AddFavoriteCompaniesModal from '../../views/customer/favoriteCompanies/modal/AddFavoriteCompaniesModal';
import FavoriteCompaniesModal from '../../views/customer/favoriteCompanies/modal/FavoriteCompaniesModal';
import NotFavCompanyDetailsModal from '../../views/customer/favoriteCompanies/modal/NotFavCompanyDetailsModal';
import RemoveFavoriteCompanyModal from '../../views/customer/favoriteCompanies/modal/RemoveFavoriteCompanyModal';
import ImageUploadViewModal from '../imageUpload/ImageUploadViewModal';
import LogoutModal from '../modal/LogoutModal';
import ReviewModal from '../../views/common/settings/profile/modal/ReviewModal';

const CommonModalArea = () => {
    return (
        <div>
            {/* CommonModalArea */}

            <ImageUploadViewModal />
            <LogoutModal />

            {/* Notification Modal */}
            <NotificationDetailsModal />

            {/* FavoriteAddressModal */}
            <AddFavoriteAddressModal />
            <FavoriteAddressDeleteModal />
            <EditFavoriteAddressModal />
            <AddressDetailsModal/>

            {/*  Favorite Companies Modal */}
            <AddFavoriteCompaniesModal />
            <FavoriteCompaniesModal />

            {/* settings Modal */}
            <EditCustomerProfileModal />
            <EditCompanyPolicyModal />
            <DeleteAccountModal />
            <EditAboutCompanyModal />
            <ReviewModal/>

            <RequestConfirmModal />


            {/* Favorite CompanyModal */}
            <RemoveFavoriteCompanyModal />
            <NotFavCompanyDetailsModal />


            {/********************** Company Modal Start ***********************/}

            {/* global_request_modals */}
            <FilterGlobalRequest />

            {/* car modals */}
            <AddCarModal />
            <CarLicensePackageModal />
            <EditCarModal />
            <CarDeleteModal />

            {/* driver modals */}
            <AddDriverModal />
            <EditDriverModal />
            <DriverDeleteModal />

            {/* shift modals */}
            <AddShift />
            <EditShift />
            <ConfirmDeleteShift />
            <FilterShift />
            <CustomStopDetails />



            {/********************** Company Modal End ***********************/}

        </div>
    )
}

export default CommonModalArea