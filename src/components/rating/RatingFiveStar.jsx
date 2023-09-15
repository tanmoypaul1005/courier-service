import React, { useEffect, useState } from 'react'
import { iFiveStar, iZeroStarHalf,iOneStarHalf,iTwoStarHalf, iThreeStarHalf,iFourStarHalf, iFourStar, iOneStar, iThreeStar, iTwoStar, iZeroStar } from '../../app/utility/imageImports';

const RatingFiveStar = ({ rating = 3 }) => {

    const [ratingIcon, setRatingIcon] = useState(iThreeStar);

    useEffect(() => {
        if (rating === 0) {
            setRatingIcon(iZeroStar);
        } else if (rating >= 0.1 && rating < 0.9) {
            setRatingIcon(iZeroStarHalf);
        }else if (rating === 1) {
            setRatingIcon(iOneStar);
        } else if (rating >= 1.1 && rating < 1.9) {
            setRatingIcon(iOneStarHalf);
        }else if (rating === 2) {
            setRatingIcon(iTwoStar);
        }else if (rating >= 2.1 && rating < 2.9) {
            setRatingIcon(iTwoStarHalf);
        } else if (rating === 3) {
            setRatingIcon(iThreeStar);
        }else if (rating >= 3.1 && rating < 3.9) {
            setRatingIcon(iThreeStarHalf);
        } else if (rating === 4) {
            setRatingIcon(iFourStar);
        } else if (rating >= 4.1 && rating < 4.9) {
            setRatingIcon(iFourStarHalf);
        } else if (rating === 5) {
            setRatingIcon(iFiveStar);
        }
    }, [rating]);
    return (
        <div>
            <img className='' src={ratingIcon} alt="" />
        </div>
    )
}

export default RatingFiveStar