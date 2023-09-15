/* eslint-disable react-hooks/exhaustive-deps */
import { useDebounce } from 'use-debounce';
import React, { useEffect } from 'react';
import useFavoriteAddressStore, { searchFavoriteAddress } from '../../../app/stores/others/favoriteAddressStore';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import FavoriteAddressTable from './tables/FavoriteAddressTable';
import { useTranslation } from 'react-i18next';


const FavoriteAddress = () => {

    const {
        favoriteAddressSearchValue,
        setFavoriteAddressSearchValue,

    } = useFavoriteAddressStore();

    const { t } = useTranslation();

    const [searchValue] = useDebounce(favoriteAddressSearchValue, 500);
    useEffect(() => {
        changePageTitle(t('Limadi | Favorite Addresses'));
        setFavoriteAddressSearchValue("")
    }, [])

    useEffect(() => {
        searchFavoriteAddress(searchValue)
    }, [searchValue])

    return (
        <><FavoriteAddressTable /></>
    );
};

export default FavoriteAddress;