import React from 'react'
import SummaryInfoItem from './components/SummaryInfoItem';
import { useTranslation } from 'react-i18next';

/**   
Props =>
content = [
      {
        title: 'Title',
        description: 'Home Shifting BD to DK',
      },
    ],
title = 'Summary',
*/
export default function Summary(pros) {

  const {
    content = [
      {
        title: 'Title',
        description: 'Home Shifting BD to DK',
        className: '',
        onClick: () => { },
      },
      {
        title: 'Transportation',
        description: 'Home Moving',
      },
      {
        title: 'Pickup Data',
        description: '10. Jan 2023',
      },
      {
        title: 'Pickup Time',
        description: '08.00 - 10:00',
      },
      {
        title: 'Delivery Overview',
        description: '7 Stops (35 Packages)',
      },
    ],
    content2 = null,
    content3 = null,
    content4 = null,
    title = ('Summary'),
    bg = 'bg-cCommonListBG',
  } = pros;
  const { t } = useTranslation();

  return (
    <div
      // onClick={()=>{console.log('__ summer content: ', content);}}
      className='w-full'>
      <div className='sub-title'>{t(title)}</div>
      <div className={`w-full ${bg} mt-4 p-3`}>
        {
          <>
            {content.map((item, index) => (
              <SummaryInfoItem key={index} title={item.title} description={item.description} className={item?.className} onClick={item?.onClick} />
            ))}

            {content2 && <div className={`my-2  bg-cMainWhite h-s1 flex flex-row justify-center `} />}

            {content2 && content2.map((item, index) => (
              <SummaryInfoItem key={index} title={item.title} description={item.description} className={item?.className} onClick={item?.onClick} />
            ))
            }

            {content3 && <div className={`my-2  bg-cMainWhite h-s1 flex flex-row justify-center `} />}

            {content3 && content3.map((item, index) => (
              <SummaryInfoItem key={index} title={item.title} description={item.description} className={item?.className} onClick={item?.onClick} />
            ))
            }

            {content4 && <div className={`my-2  bg-cMainWhite h-s1 flex flex-row justify-center `} />}

            {content4 && content4.map((item, index) => (
              <SummaryInfoItem key={index} title={item.title} description={item.description} className={item?.className} onClick={item?.onClick} />
            ))
            }
          </>

        }
      </div>
    </div>
  )
}
