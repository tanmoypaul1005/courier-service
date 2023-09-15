// import moment from "moment";
import i18next from "i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSideBarList from "../../components/layout/SidebarItemArrays/AdminSideBarList";
import CompanySideBarList from "../../components/layout/SidebarItemArrays/CompanySideBarList";
import CustomerSideBarList from "../../components/layout/SidebarItemArrays/CustomerSideBarList";
import useGeneralStore, { setFirebaseDeviceToken } from "../stores/others/generalStore";
import useLayoutStore from "../stores/others/layoutStore";
import useSettingsStore from "../stores/others/settingsStore";
import AxiosHeader from "./AxiosHeader";
import { user_role } from "./const";
import { iBottomSorted, iNotSorted, iTopSorted } from "./imageImports";
import { createTheme } from "@mui/material";

export const changePageTitle = (newTitle) => {
  return (document.title = newTitle);
};

export const Toastr = ({ message = "", type = "error" }) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
  });
};

export const formatDate = (date, withTime = false) => {
  const { app_lang_code } = useSettingsStore.getState();
  if (!date) return null;
  const months = [];
  months["en"] = [
    ". Jan",
    ". Feb",
    ". Mar",
    ". Apr",
    ". May",
    ". Jun",
    ". Jul",
    ". Aug",
    ". Sep",
    ". Oct",
    ". Nov",
    ". Dec",
  ];
  months["da"] = [
    ". jan.",
    ". feb.",
    ". mar.",
    ". apr.",
    ". maj.",
    ". jun.",
    ". jul.",
    ". aug.",
    ". sept.",
    ". okt.",
    ". nov.",
    ". dec.",
  ];
  const targetDate = new Date(date);
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();

  if (withTime)
    return `${new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate()}${months[app_lang_code][new Date(date).getMonth()]} ${new Date(date).getFullYear()}, ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  else
    return `${new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate()}${months[app_lang_code][new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

export const formatDateV2 = (date = new Date()) => {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const formatDateOrTime = (dateTime, type = 'time') => {
  if (!dateTime) return null;
  const date = new Date(
    new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  if (type === "date") {
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}. ${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }. ${date.getFullYear()}`;
  } else {
    //return time
    return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  }
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export const dateDifference = (date) => {
  const date1 = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const date2 = new Date(
    new Date(date).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  const DifferenceDay = Math.abs(diffDays)
  const value2 = DifferenceDay === 0 ? 'Today' : Math.abs(diffDays)
  return value2
};

export const dateDifference2 = (startDate, endDate) => {
  const date1 = new Date(
    new Date(startDate).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const date2 = new Date(
    new Date(endDate).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  return Math.abs(diffDays);
};

export const isLettersOnly = (string) => {
  return /^[a-zA-Z]+$/.test(string);
};




export const extractDate = (date) => {
  const t_date = new Date(date);
  let month = (t_date.getMonth() + 1)
  if (month < 10) month = "0" + month.toString();

  let day = (t_date.getDate());
  if (day < 10) day = "0" + day.toString();
  // return t_date;
  return t_date.getFullYear() + "-" + month + "-" + day;
}


export const getFormatedStringFromDays = (numberOfDays) => {
  var years = Math.floor(numberOfDays / 365);
  var months = Math.floor(numberOfDays % 365 / 30);
  var days = Math.floor(numberOfDays % 365 % 30);

  var yearsDisplay = years > 0 ? years + (years === 1 ? " year " : " years ") : "";
  var monthsDisplay = months > 0 ? months + (months === 1 ? " month " : " months ") : "";
  var daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "0 days";
  return yearsDisplay + monthsDisplay + daysDisplay;
}

export const smartFormattedDateDiff = (startDateInput = "", endDateInput) => {

  if (startDateInput === "") startDateInput = new Date(startDateInput);
  else startDateInput = new Date();
  endDateInput = new Date(endDateInput);

  startDateInput.setHours(0, 0, 0, 0);
  // console.log("startDateInput::::", startDateInput);
  endDateInput.setHours(0, 0, 0, 0);
  // console.log("endDateInput::::", endDateInput);

  let dateTimeToFormat = endDateInput.getTime() - startDateInput.getTime();

  if (dateTimeToFormat < 0) dateTimeToFormat = dateTimeToFormat * (-1);
  // if (dateTimeToFormat < 0) return "0 Hours 0 Minutes ";

  // const diffDuration = moment.duration(dateTimeToFormat);

  // console.log("diffDuration ::::::", diffDuration, "\n\n dateTimeToFormat", dateTimeToFormat); 

  // let yearString = diffDuration.years() > 1 ? " Years" : " Year";
  // let monthString = diffDuration.months() > 1 ? " Months" : " Month";
  // let dayString = diffDuration.days() > 1 ? " Days" : " Day";
  // let hourString = diffDuration.hours() > 1 ? " Hours" : " Hour";
  // let minuteString = diffDuration.minutes() > 1 ? " Minutes" : " Minute";

  // if (diffDuration.years() > 0) {
  //   if (diffDuration.months() === 0) return diffDuration.years() + yearString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  //   else return diffDuration.years() + yearString + ", " + diffDuration.months() + monthString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // }

  // if (diffDuration.years() === 0 && diffDuration.months() > 0) return diffDuration.months() + monthString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // if (diffDuration.years() === 0 && diffDuration.months() === 0 && diffDuration.days() > 0) return diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // if (diffDuration.years() === 0 && diffDuration.months() === 0 && diffDuration.days() === 0) return diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;

  return "00 [NEW VERSION NEEDED] ";

}
export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padTo2Digits(hours)}.${padTo2Digits(minutes)} hr`;
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const dateDiffCalendar = (startingDateInput, endingDateInput, lastAction = false) => {

  if (lastAction) startingDateInput = startingDateInput.setDate(startingDateInput.getDate() + 1);

  let startingDate = new Date(startingDateInput).setHours(0, 0, 0, 0);


  let endingDate = new Date(endingDateInput).setHours(0, 0, 0, 0);

  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    const swap = startDate;
    startDate = endDate;
    endDate = swap;
  }
  const startYear = startDate.getFullYear();
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  let yearString = yearDiff > 1 ? " years " : " year ";
  let monthString = monthDiff > 1 ? " months " : " month ";
  let dayString = dayDiff > 1 ? " days" : " day";

  return (yearDiff ? (yearDiff + yearString) : "") + (monthDiff ? (monthDiff + monthString) : "") + (dayDiff ? (dayDiff + dayString) : '0 day ');
}

export const calculateEndDateCalendar = (months, startDate = new Date()) => {
  let date = new Date(startDate);

  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() + months)
  date.setDate(date.getDate() - 1);

  return date;
}

export const roughLicenseDurationFormatter = (days = 0) => {


  let monthCounter = parseInt(days / 30);
  let yearCounter = 0;


  if (monthCounter > 11) {
    yearCounter = parseInt(monthCounter / 12);
    monthCounter = parseInt(monthCounter - (12 * yearCounter));
  }
  //console.log("roughLicenseDurationFormatter::: monthCounter: " + monthCounter + " yearCounter: " + yearCounter);

  let yearString = yearCounter > 1 ? " Years " : " Year ";
  let monthString = monthCounter > 1 ? " Months " : " Month ";

  return (yearCounter ? (yearCounter + yearString) : "") + (monthCounter ? (monthCounter + monthString) : "");

}

export function isNullDirty(value) {
  if (value === null || value === undefined || value === "" || value === "null") return true;
  else return false;
}


export function LogDanger(message, value) {
  console.log('%c' + message, 'background: #f40e44; color: #ffffff; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogToDo(message, value) {
  console.log('%c' + message, 'background: #f4ef4b; color: #000000; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogSuccess(message, value) {
  console.log('%c' + message, 'background: #47ff90; color: #000000; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogWarning(message, value) {
  console.log('%c' + message, 'background: #FC4C02; color: #ffffff; font-weight: bold; padding:15px; border-radius: 1500px', value);
}


export const formatSearchAddress = (addresses = []) => {
  let formatSearchAddress = []
  addresses.forEach((address) => {
    let x = address.title.split(',')
    let y = ''
    for (let i = (x.length - 1); i >= 0; i--) {
      i === 0 && (y += x[i])
      i > 0 && (y += x[i] + ", ")
    }
    formatSearchAddress.push({ ...address, title: y })
  })
  return formatSearchAddress
}

export const formatSearchAddressV2 = (data = [], has_postal_code = true) => {
  // console.log('formatSearchAddressV2', data);
  let temp_address = [];
  data.forEach((d) => {
    let x = d.address;
    let y = '';
    x?.street ? y += x.street + (x?.houseNumber ? ' ' : ', ') : y += '';
    x?.houseNumber ? y += x.houseNumber + ', ' : y += '';
    (has_postal_code && x?.postalCode) ? y += x.postalCode + ', ' : y += '';
    x?.city ? y += x.city + ', ' : y += '';
    x?.countryName ? y += x.countryName + ', ' : y += '';
    let count = y.split(',').length - 1;
    if (count > 0) y = y.substring(0, y.length - 2);
    (y.length !== 0) && temp_address.push({ ...d, title: y });
  })
  // console.log('temp_address', temp_address);
  return temp_address;
}

export const suggestionFormat = (x) => {
  // console.log('suggestionFormat', x);
  // console.log('suggestionFormat', x.street);
  let y = '';
  x?.street ? y += x.street + (x?.houseNumber ? ' ' : ', ') : y += '';
  x?.houseNumber ? y += x.houseNumber + ', ' : y += '';
  x?.city ? y += x.city + ', ' : y += '';
  x?.countryName ? y += x.countryName + ', ' : y += '';
  (x?.postalCode) ? y += x.postalCode + ', ' : y += '';
  let count = y.split(',').length - 1;
  if (count > 0) y = y.substring(0, y.length - 2);
  return y;
}

export function getBrowserWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

export const setUserRole = (role = user_role.customer) => {
  const { setUserRole } = useGeneralStore.getState();

  if (role === 'private') {
    setUserRole(user_role.customer);
  } else if (role === user_role.company) {
    setUserRole(user_role.company);
  } else if (role === user_role.admin || role === 'admin') {
    setUserRole(user_role.admin);
  }
}

export const setAppSidebarList = (user_role) => {
  const { setSidebarItemsList } = useLayoutStore.getState();
  switch (user_role) {
    case "company":
      setSidebarItemsList([...CompanySideBarList]);
      break;
    case "private":
      setSidebarItemsList([...CustomerSideBarList]);
      break;
    case "admin":
      setSidebarItemsList([...AdminSideBarList]);
      break;
    case "sa":
      setSidebarItemsList([...AdminSideBarList]);
      break;

    default:
      setSidebarItemsList([...CompanySideBarList]);
      break;
  }
}

export const setAxiosHeaders = (user_role) => {
  if (localStorage.limadi_token) {
    AxiosHeader(localStorage.limadi_token, user_role);
  } else if (sessionStorage.limadi_token) {
    AxiosHeader(sessionStorage.limadi_token, user_role);
  } else {
    AxiosHeader();
  }
}


export const htmlToPlainText = (html) => {

  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element 
  return tempDivElement.textContent || tempDivElement.innerText || "";
}
export const removeSecFromDeliveryTime = (time) => {
  if (!time) return null;

  if (typeof time !== 'string') {
    console.log("Invalid time format");
    return null;
  }

  const time_array = time.split(":");
  const hour = time_array[0] ?? '';
  const min = time_array[1] ?? '';

  if (hour === '' || min === '') return '';
  return `${hour}:${min}`;
}


export const formatDateForMui = (date) => {

  // "2017-05-24T10:30"

  date = new Date(date);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;

  return year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
}



export const initializeFirebase = (is_logged_in, firebase) => {
  if (is_logged_in) {
    // initialize firebase
    let messaging = null;
    if (firebase.messaging.isSupported()) {
      messaging = firebase.messaging();
    }
    messaging && messaging.requestPermission().then(() => {
      return messaging.getToken()
    }).then(token => {
      setFirebaseDeviceToken(token)
      // console.log('Token : ', token)
    }).catch((err) => {
      console.log(err);

    })
  }
}

export const setAppLanguage = (lang_code) => {
  useSettingsStore.getState().setAppLangCode(lang_code);
  i18next.changeLanguage(lang_code);
  localStorage.setItem("lang_code", lang_code);
}

export function countNewLines(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      count++;
    }
  }
  return count + 1;  //to pre fetch rows of textarea input
}

export function getStringFromDateObject(date) {
  date = new Date(date);
  const year = date?.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export function isValidUrl(url) {
  // Regular expression pattern for a valid website URL
  var pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;
  // Test the input URL against the pattern
  return pattern.test(url);
}

export function setLocalDataWithExpiry(key, value, ttl) {
  const now = new Date(); // get current date and time
  const item = {
    value: value, // data value
    expiry: now.getTime() + ttl // expiry time in milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item)); // store as JSON string
}

export function getLocalDataWithExpiry(key) {
  const itemStr = localStorage.getItem(key); // get JSON string
  if (!itemStr) { // if no item found return null
    return null;
  }
  const item = JSON.parse(itemStr); // parse as object
  const now = new Date(); // get current date and time
  if (now.getTime() > item.expiry) { // compare with expiry time
    localStorage.removeItem(key); // remove expired item
    return null;
  }
  return item.value; // return data value
}



// const secretKey = "some-super-secret-key";

export const encryptNumber = (number) => {
  // Generate a random number
  var num = Math.random();
  // Convert it to a string in base 36 (alphadecimal)
  var str = num.toString(36);
  // Remove the leading "0." and keep only 5 characters
  str = str.slice(2, 7);
  // Display the result
  console.log(str)
  return str;

};

export const decryptNumber = (str) => {
  // Convert the string back to a number in base 36
  var num2 = parseInt(str, 36);
  // Divide it by Math.pow(36,5) to get back the original number
  num2 = num2 / Math.pow(36, 5);
  // Display the result
  console.log(num2);
  return num2;
};


export const formatTime = (time) => {
  if (!time) return time
  const [hours, minutes] = time?.split(":");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime
}
export function formatTimeHourMinutes(timeString) {
  // Split the time string into hours, minutes, and seconds
  if (timeString) {
    const [hours, minutes] = timeString?.split(':');

    // Return the formatted time string
    return `${hours}:${minutes}`;
  }
}

export function secondsToHms(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}`;
}

export function removeEmpty(obj) {
  for (let prop in obj) {
    if (!obj[prop] || obj[prop]?.length === 0) {
      delete obj[prop];
    }
  }
  return obj;
}
export function getOrdinalNumber(n) {
  if (n === 0) {
    return "0";
  }
  const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
  const lastTwoDigits = n % 100;
  const lastDigit = n % 10;
  const suffix = suffixes[lastTwoDigits] || suffixes[lastDigit] || suffixes[0];
  if (n >= 10 && n <= 20)
    return `${n}${suffixes[0]}`;
  else
    return `${n}${suffix}`;
}

export function checkPastTime(time, inputDate = new Date()) {
  if (time) {
    const timeArray = time?.split(":");
    var nowDate = new Date();
    inputDate = new Date(inputDate);

    inputDate.setHours(timeArray[0]);
    inputDate.setMinutes(timeArray[1]);

    if (nowDate > inputDate) return true;   //this means the input time is a past time along with the date
    else return false;
  }
}

export function insertElementAtIndex(arr, index, element) {
  arr.splice(index, 0, element);
  return arr;
}
export function getTimeFromDate(date) {
  date = new Date(date);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const calculateDistance = (data) => {
  let distance = 0;
  let unit = 'KM';
  distance = data / 1000;
  if (distance < 1) {
    distance = distance * 1000;
    distance = Math.round(distance);
    unit = data > 1000 ? 'M' : "KM";
  } else {
    distance = Math.round(distance);
  }

  return {
    distance: distance ?? 0,
    unit: unit
  }
}

export const calculateTime = (data) => {
  if (parseInt(data) === 0) {
    return "0 min"
  } else {
    const hours = Math.floor(parseInt(data) / 3600);
    const minutes = Math.floor((parseInt(data) % 3600) / 60);
    const remainingSeconds = parseInt(data) % 60;

    return `${hours > 0 ? `${hours} hrs` : ""} ${minutes > 0 ? `${minutes} min` : ""} `;
  }

};


export function secondsToHoursFormatted(seconds) {
  if (typeof parseInt(seconds) !== 'number') {
    console.log("Invalid input. Please provide a number of seconds.");
    return null;
  }

  const hours = Math.floor(parseInt(seconds) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours + minutes / 60 + remainingSeconds / 3600;

  return `${formattedHours?.toFixed(2)} Hrs`;
}

export function objectToArray(obj, twoDeeArray = false) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const result = [];

  for (let i = 0; i < keys.length; i++) {
    if (twoDeeArray) {
      result.push([keys[i], values[i]]);
    } else {
      result.push(...values[i]);
    }
  }

  return result;
}

export function removeAnArrayItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function titleCaseJS(string) {
  if (string?.length > 1)
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export const formatDateToApiDate = (data) => {
  // create a Date object from the given string
  const date = new Date(data);

  // extract the year, month, and day from the Date object
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  // concatenate the year, month, and day with dashes to form the desired format
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate); // output: "2023-03-28"
  return formattedDate;

}

export const defineTableSortIcon = (status, isActive) => {
  // console.log('defineTableSortIcon', status, isActive);
  if (status && isActive) return iTopSorted;
  else if (!status && isActive) return iBottomSorted;
  else return iNotSorted;
}

export const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#fff",
          "&$error": {
            color: "#fff",
          },
        },
      },
    },
  },
});

export const theme2 = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#FF6368",
          "&$error": {
            color: "#FF6368",
          },
        },
      },
    },
  },
});

export const forwardDate = (date) => {
  const x = new Date(date);
  x.setDate(x.getDate() + 1);
  return x.toISOString().slice(0, 10);
}

export const backwardDate = (date) => {
  const x = new Date(date);
  x.setDate(x.getDate() - 1);
  return x.toISOString().slice(0, 10);
}

export const validatePhoneNumber = (input) => {
  const regex = /^(?:\+\d)?\d+$/;
  return regex.test(input);
};


