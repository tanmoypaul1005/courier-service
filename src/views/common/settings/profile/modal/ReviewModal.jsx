/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useSettingsStore, { getRatingAndReview } from '../../../../../app/stores/others/settingsStore';
import CommonModal from '../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';
import RatingFiveStar from '../../../../../components/rating/RatingFiveStar';
import { useEffect } from 'react';
import SelectInput from '../../../../../components/input/SelectInput';
import { formatDate } from '../../../../../app/utility/utilityFunctions';

const ReviewModal = () => {

    const { t } = useTranslation();

    const { ratingValue, setRatingValue, setRatingAndReview, tampRatingAndReview, showReviewModal, setShowReviewModal, ratingAndReviewDetails, ratingAndReview } = useSettingsStore();

    useEffect(() => {
        fetchData()
    }, [showReviewModal === true])

    const fetchData = async () => {
        if (showReviewModal === true) {
            await getRatingAndReview();
        }
    }


    const total_review = ratingAndReviewDetails?.reviews?.length

    const five_star_review = ratingAndReviewDetails?.reviews?.filter(item => item.rate === 5);
    const four_star_review = ratingAndReviewDetails?.reviews?.filter(item => item.rate === 4);
    const three_star_review = ratingAndReviewDetails?.reviews?.filter(item => item.rate === 3);
    const two_star_review = ratingAndReviewDetails?.reviews?.filter(item => item.rate === 2);
    const one_star_review = ratingAndReviewDetails?.reviews?.filter(item => item.rate === 1);

    const five_star = Math.floor((five_star_review?.length / total_review) * 100);
    const four_star = Math.floor((four_star_review?.length / total_review) * 100);
    const three_star = Math.floor((three_star_review?.length / total_review) * 100);
    const two_star = Math.floor((two_star_review?.length / total_review) * 100);
    const one_star = Math.floor((one_star_review?.length / total_review) * 100);

    return (
        <div>
            <CommonModal
                showModal={showReviewModal}
                setShowModal={setShowReviewModal}
                modalTitle={t("Reviews & Ratings")}
                mainContent={
                    <>
                        <div className='flex items-center justify-between mt-s32 mb-s24'>
                            <div className="space-y-2">
                                <div className='flex'>
                                    <div className="text-cBrand text-fs40 font-fw600">
                                        {ratingAndReviewDetails?.rating ? parseFloat(ratingAndReviewDetails?.rating?.toFixed(1)) : 0}
                                    </div>
                                    <div className="text-[#D1D5DB] text-fs40 font-fw600">/5</div>
                                </div>
                                <RatingFiveStar rating={parseFloat(ratingAndReviewDetails?.rating?.toFixed(1))} />
                                {/* <div className="text-cLightGrayishBlue text-fs24 font-fw500">{ratingAndReviewDetails?.people_reviewed ?? 0} Rating</div> */}
                            </div>

                            <div className='space-y-4'>
                                <ReviewList rating={5} star={five_star} star_length={five_star_review?.length} />
                                <ReviewList rating={4} star={four_star} star_length={four_star_review?.length} />
                                <ReviewList rating={3} star={three_star} star_length={three_star_review?.length} />
                                <ReviewList rating={2} star={two_star} star_length={two_star_review?.length} />
                                <ReviewList rating={1} star={one_star} star_length={one_star_review?.length} />
                            </div>
                        </div>


                        <div className='flex items-center justify-between border-y-2 py-s4 border-cLightGrayishBlue'>
                            <div>{t("Ratings")} ({ratingAndReview?.length})</div>
                            {/* <SelectInput
                                placeholder="All"
                                selectOptionOnChange={(e) => {
                                    if (e) {
                                        setRatingValue(e)
                                        setRatingAndReview(tampRatingAndReview?.filter(item => parseInt(item.rate) === parseInt(e)))
                                    } else {
                                        fetchData();
                                    }
                                }}
                                dataArray={[
                                    {
                                        title: "1",
                                        value: 1,
                                        selected: ratingValue === 1 ? true : false
                                    }, {
                                        title: 2,
                                        value: 2,
                                        selected: ratingValue === 2 ? true : false
                                    },
                                    {
                                        title: 3,
                                        value: 3,
                                        selected: ratingValue === 3 ? true : false
                                    }, {
                                        title: "4",
                                        value: 4,
                                        selected: ratingValue === 4 ? true : false
                                    },
                                    {
                                        title: "5",
                                        value: 5,
                                        selected: ratingValue === 5 ? true : false
                                    }
                                ]}
                            /> */}
                        </div>

                        {
                            ratingAndReview?.length > 0 ?
                                ratingAndReview?.map((item, index) => (
                                    <div className='mt-s20' key={index}>
                                        <div className='flex justify-between'>
                                            <RatingFiveStar rating={item?.rate ?? 0} />
                                            <div className='text-fs12 font-fw400 text-cGrey'>{item?.date ? formatDate(item?.date) : "NA"}</div>
                                        </div>
                                        <div className='text-fs14 text-cGrey mt-s10'>
                                            {item?.review ? item?.review : 'NA'}
                                        </div>
                                        {ratingAndReview?.length !== index + 1 && <div className='mt-s23'><hr></hr></div>}
                                    </div>
                                )) : <div className="flex items-center justify-center mt-s10">No Review</div>
                        }

                    </>
                }
            />
        </div>
    );
};

export default ReviewModal;


export const ReviewList = ({ star, rating, star_length }) => {
    const { setRatingAndReview, tampRatingAndReview, setRatingValue } = useSettingsStore();

    const showStyles = {
        width: `${star}%`,
    };

    const NonShowStyles = {
        width: `${100 - star}%`,
    };

    return (
        <>
            <div
                onClick={() => {
                    setRatingValue(rating)
                    setRatingAndReview(tampRatingAndReview?.filter(item => parseInt(item.rate) === parseInt(rating)))
                }}
                className='flex space-x-3 cursor-pointer'>
                <RatingFiveStar rating={rating} />
                {star > 0 ? <div className='h-s18 max-w-[200px] min-w-[200px] flex'>
                    <div style={showStyles} className={` bg-cBrand h-s18`}></div>
                    <div style={NonShowStyles} className={`bg-cAliceBlue w-[${100 - star}%] h-s18`}></div>
                </div> : <div className="h-s18 max-w-[200px] min-w-[200px] bg-cAliceBlue"></div>
                }
                <div className='text-fs14 font-fw400 text-cBlack'>{star_length}</div>
            </div>
        </>
    )
}