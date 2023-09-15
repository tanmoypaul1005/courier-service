import React, { useState } from 'react';
import { iPlayGround } from '../../../app/utility/imageImports';
import CommonDatePicker from '../../../components/input/CommonDatePicker';
import CommonInput from '../../../components/input/CommonInput';
import CommonTimePicker from '../../../components/input/CommonTimePicker';
import SliderToSubmit from '../../../components/input/SliderToSubmit';
import SlideToSubmit from '../../../components/input/SlideToSubmit';
import CommonMultiSelect from '../../../components/select/CommonMultiSelect';
import CommonSelect from '../../../components/select/CommonSelect';
import CommonTable from '../../../components/table/CommonTable';


const PlayGround = () => {
  const HeaderTitles = [
    {}
  ]
  return (
    <div className='w-full rounded-lg p-5 min-h-[500px] bg-white'>

      <div className='w-full flex items-center justify-center space-x-3 font-bold text-4xl mb-5'> <div><img className='w-16 mr-5' src={iPlayGround} alt="" /></div> Play Ground</div>

      <div className="py">
        <CommonTable
          showSearchBox={true}
          showTopRightFilter={true}
          showTakeOption={true}

          items={
            <>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
              <tr className='border border-collapse'>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='border-r text-center py-2.5'>123</td>
                <td className='text-center py-2.5'>123</td>
              </tr>
            </>
          }

        />
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>Normal Input</div>
        <CommonInput />
        <div className="mt-5">Textarea Input</div>
        <CommonInput textarea={true} />
        <div className="mt-5">Single Item Select</div>
        <CommonSelect />
        <div className="mt-5">Multi Item Select</div>
        <CommonMultiSelect />
        <div className="mt-5">Time Picker</div>
        <CommonTimePicker />
        <div className="mt-5">Date Picker</div>
        <CommonDatePicker />

        <div className="pt-5"></div>
        <SlideToSubmit onSubmission={(e) => { console.log('SUBMITTED : ', e); }} />

        <div className="pt-5"></div>
        <SliderToSubmit onSubmission={(e) => console.log('NEW SLIDER SUBMISSION : ', e)} />
      </form>

    </div >
  )
}

export default PlayGround