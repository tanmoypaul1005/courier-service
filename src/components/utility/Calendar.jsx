/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Calendar = ({ format = 'y-m-d', init_date = null, selectAction }) => {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const [title, setTitle] = useState('')
  const [selected_date, setSelectedDate] = useState(`${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`)
  const [formatted_date, setFormattedDate] = useState(null)

  // ! Critical Data ==============================================================
  const [day, setDay] = useState((new Date()).getDate())
  const [month, setMonth] = useState((new Date()).getMonth())
  const [year, setYear] = useState((new Date()).getFullYear().toString().slice(-2)) // ! Get last 2 digit of the year
  const [full_year, setFullYear] = useState((new Date()).getFullYear()) // ! Make sure to sync full_year & year variable
  const [dates, setDates] = useState([])
  const [prev_month_dates, setPrevDates] = useState([])
  const [next_month_dates, setNextDates] = useState([])

  const [start_week, setStartWeek] = useState(0) // ! Start week of the day
  const [end_day, setEndMonth] = useState(0) // ! End day of the month
  // ! ============================================================================


  const setInitDate = () => {
    // TODO: Setting initial_date has some issue at initialization

    let temp_day = null;
    let temp_month = null;
    let temp_year = null;
    console.log('init_date', init_date);

    if (init_date) {
      setDay((new Date(init_date)).getDate())
      setMonth((new Date(init_date)).getMonth())
      setYear((new Date(init_date)).getFullYear().toString().slice(-2))
      setFullYear((new Date(init_date)).getFullYear())

      temp_day = (new Date(init_date)).getDate();
      temp_month = (new Date(init_date)).getMonth() + 1;
      temp_year = (new Date(init_date)).getFullYear();
    } else {
      temp_day = (new Date()).getDate();
      // it's +1 because month is 0-11
      temp_month = (new Date()).getMonth() + 1;
      temp_year = (new Date()).getFullYear();
    }
    // ! For month use {temp_month + 1}. Only for selected_date
    if (temp_day && temp_month && temp_year) {
      const new_selected_date = `${temp_year}-${temp_month}-${temp_day}`
      setSelectedDate(new_selected_date)

      console.log({
        'init_date': init_date,
        'day': day,
        'month': (new Date(init_date)).getMonth(),
        'year': year,
        'full_year': full_year,
        'new_selected_date': new_selected_date,
      });
    }
  }
  const setStartOfTheWeek = () => {
    setStartWeek((new Date(year, month)).getDay())
  }
  const setEndDayOfMonth = () => {
    setEndMonth((new Date(year, month + 1, 0)).getDate())
  }
  const generateDates = () => {
    // TODO: Leap year has issue

    let new_dates = [];
    for (let i = 0; i < end_day; i++) {
      let temp_date = {
        'day': i + 1,
        'month': month,
        'year': full_year
      }
      new_dates.push(temp_date)
    }
    setDates(new_dates)

    // ! ======================================================
    // ! Get from which position to start this month's day from
    // ! ======================================================
    // ? If we need to change the starting week from Sunday to some other day, Make changes in here
    let start_this_month_from = start_week - 1; // ! start_week - 1 because we wan't to start the week from sunday, not saturday
    if (start_week === 0) start_this_month_from = 6

    // ! ============================
    // ! Setting Previous month dates
    // ! ============================
    const end_of_prev_month = (new Date(year, month, 0)).getDate()
    let new_prev_dates = [];
    for (let i = 0; i < start_this_month_from; i++) {
      let temp_date = {
        'day': (end_of_prev_month - start_this_month_from) + i + 1,
        'month': month > 0 ? (month - 1) : 11,
        'year': month > 0 ? full_year : full_year - 1
      }
      new_prev_dates.push(temp_date)
    }
    setPrevDates(new_prev_dates)

    // ! ========================
    // ! Setting Next month dates
    // ! ========================
    let new_next_dates = [];
    // ! Count total grid number
    let next_month_remaining = 35 - (new_prev_dates.length + end_day) // ! Finds remaining next month dates
    if (next_month_remaining < 0) next_month_remaining = 42 - (new_prev_dates.length + end_day)
    for (let i = 0; i < next_month_remaining; i++) {
      let temp_date = {
        'day': i + 1,
        'month': month < 11 ? month + 1 : 0,
        'year': month < 11 ? full_year : full_year + 1
      }
      new_next_dates.push(temp_date)
    }
    setNextDates(new_next_dates)
  }

  const selectDate = (date) => {
    let new_selected_date = `${date.year}-${date.month + 1}-${date.day}`
    setSelectedDate(new_selected_date)
  }
  const formatSelectedDate = async() => {
    let new_formatted_date = await selected_date;
    // let x_day = await (new Date(selected_date)).getDate()
    // let x_month = await (new Date(selected_date)).getMonth()
    // let x_year = await (new Date(selected_date)).getFullYear()


    const dateParts = selected_date.split("-").map(Number);
    const [year, month, day] = dateParts;

    const dateObject = new Date(year, month - 1, day);

    const x_day = dateObject.getDate(); // Get the day of the month (1-31)
    const x_month = dateObject.getMonth(); // Get the month (0-11, where 0 represents January)
    const x_year = dateObject.getFullYear(); // Get the year (e.g., 2023)

    console.log("selected_date", `${x_year}-${x_month + 1}-${x_day}`)

    switch (format) {
      case 'd-m-y':
        new_formatted_date = `${x_day}-${x_month + 1}-${x_year}`
        break;
      case 'y-m-d':
        new_formatted_date = `${x_year}-${x_month + 1}-${x_day}`
        break;
      case 'd MM, YY':
        new_formatted_date = `${x_day} ${months[x_month]}, ${x_year}`
        break;
      default:
        new_formatted_date = `${x_day}-${x_month + 1}-${x_year}`
        break;
    }
    await setFormattedDate(new_formatted_date)
  }

  useEffect(() => {
    setInitDate()
  }, [])

  useEffect(() => {
    if (selectAction) selectAction(formatted_date)
  }, [formatted_date])

  useEffect(() => {
    formatSelectedDate()
  }, [selected_date])

  useEffect(() => {
    setStartOfTheWeek()
    setEndDayOfMonth()
  }, [day, month, year])

  useEffect(() => {
    generateDates()
  }, [start_week, end_day])

  const prevMonth = () => {
    if (month > 0) {
      setMonth(month - 1)
    } else {
      setMonth(11)
      setYear(year - 1)
      setFullYear(full_year - 1)
    }
  }
  const nextMonth = () => {
    if (month < 11) {
      setMonth(month + 1)
    } else {
      setMonth(0)
      setYear(year + 1)
      setFullYear(full_year + 1)
    }
  }

  useEffect(() => {
    setTitle(`${months[month]} ${full_year}`)

    // console.log("========================");
    // console.log("Day: " + day);
    // console.log("Month: " + month);
    // console.log("Year: " + year);
    // console.log("Start of Week: " + start_week);
    // console.log("End Day of the Month: " + end_day);
    // console.log("Selected Date: " + selected_date);
    // console.log("========================");
  }, [day, month, year, start_week, end_day, dates, selected_date])

  return (



    <div>
      <div className="bg-white w-72 rounded-lg border overflow-hidden shadow-c1">

        {/* <div className='text-center font-bold text-md'>Date: {formatted_date}</div> */}


        <div className="bg-gray-200 p-3">
          <div className="flex justify-between items-center mb-3">
            <IoIosArrowBack onClick={prevMonth} className="hover:bg-white text-2xl p-1 rounded cursor-pointer" />
            <div className="font-bold">{title}</div>
            <IoIosArrowForward onClick={nextMonth} className="hover:bg-white text-2xl p-1 rounded cursor-pointer" />
          </div>
          <div className="grid grid-cols-7 gap-1 font-bold">
            {days.map(day => (<div className="p-1 rounded text-center">{day}</div>))}
          </div>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-7 gap-1 text-sm">
            {prev_month_dates.map(date => (
              <>
                {selected_date && (new Date(selected_date)).getFullYear() === date.year && (new Date(selected_date)).getMonth() === date.month && (new Date(selected_date)).getDate() === date.day ? (
                  <div key={`${date.year}-${date.month + 1}-${date.day}`} className="p-1 rounded text-center hover:bg-amber-400 hover:text-cWhite text-gray-300 cursor-pointer">{date.day}</div>
                ) : (
                  <div onClick={() => selectDate(date)} key={date.day} className="p-1 rounded text-center hover:bg-amber-400 hover:text-cWhite text-gray-300 cursor-pointer">{date.day}</div>
                )}
              </>
            ))}
            {dates.map(date => (
              <>
                {selected_date && (new Date(selected_date)).getFullYear() === date.year && (new Date(selected_date)).getMonth() === date.month && (new Date(selected_date)).getDate() === date.day ? (
                  <div key={`${date.year}-${date.month + 1}-${date.day}`} className="p-1 rounded text-center bg-amber-400 text-cWhite cursor-pointer">{date.day}</div>
                ) : (
                  <div onClick={() => selectDate(date)} key={date} className="p-1 rounded text-center hover:bg-amber-400 hover:text-cWhite cursor-pointer">{date.day}</div>
                )}
              </>
            ))}
            {next_month_dates.map(date => (
              <>
                {selected_date && (new Date(selected_date)).getFullYear() === date.year && (new Date(selected_date)).getMonth() === date.month && (new Date(selected_date)).getDate() === date.day ? (
                  <div key={`${date.year}-${date.month + 1}-${date.day}`} className="p-1 rounded text-center bg-amber-400 text-cWhite cursor-pointer">{date.day}</div>
                ) : (
                  <div onClick={() => selectDate(date)} key={date.day} className="p-1 rounded text-center hover:bg-amber-400 hover:text-cWhite text-gray-300 cursor-pointer">{date.day}</div>
                )}
              </>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Calendar