export const base_url_src = process.env.REACT_APP_BASE_URL;
export const base_url = base_url_src + "api/v1";

/** pickup, mass_import, select_company, select_shift */
export const create_request_steps = {
  pickup: "pickup",
  mass_import: 'stops',
  select_company: 'select_company',
  select_shift: 'select_shift',
};

export const create_request_type = {
  normal: "normal",
  mass_import: "mass_import"
}

/** customer, company, sa */
export const user_role = {
  customer: "private",
  company: "company",
  admin: "sa",
}

export const map_marker =
  `<svg width="32" height="80" style="left: -15px; top: -55px;" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_35_1260)">
  <path d="M15.9107 13.8733L10.1962 19.6775L4.48812 13.8733C4.17792 13.5762 3.88957 13.2551 3.62962 12.9143C3.53787 12.792 3.44612 12.6675 3.36093 12.5386C2.50024 11.2607 2 9.72717 2 8.07789C2 3.40967 6.01943 -0.334518 10.8318 0.0237354C14.8884 0.323009 18.1389 3.58006 18.3836 7.57983C18.5321 10.0505 17.5556 12.2983 15.9107 13.8733Z" fill="#00B5B1"/>
  <path d="M10.1983 10.2143C11.4145 10.2143 12.4003 9.22848 12.4003 8.01238C12.4003 6.79627 11.4145 5.81042 10.1983 5.81042C8.98225 5.81042 7.9964 6.79627 7.9964 8.01238C7.9964 9.22848 8.98225 10.2143 10.1983 10.2143Z" fill="white"/>
  <path d="M10.2136 15.5401H14.268L12.2583 17.6306L10.1962 19.6775L8.16896 17.6306L6.12866 15.5401H10.2136Z" fill="#0C8789"/>
  </g>
  <defs>
  <clipPath id="clip0_35_1260">
  <rect width="20" height="20" fill="white"/>
  </clipPath>
  </defs>
  </svg>
`;

export const k_submit_otp_type = {
  forget_password: "forget_password",
  auth_verify: "auth_verify"
}

export const kOneMinutes = 60 * 1000;
export const kFiveMinutes = 5 * 60 * 1000;
export const kTenMinutes = 10 * 60 * 1000;
export const kOneHour = 60 * 60 * 1000;
export const kOneMonth = 30 * 24 * 60 * 60 * 1000;


export const k_request_paths = {
  saved: '/requests/saved',
  invitation: '/requests/invitation',
  in_bidding: '/requests/in-bidding',
  not_planned: '/requests/not-planned',
  awarded: '/requests/awarded',
  ongoing: '/requests/on-going',
  completed: '/requests/completed',
  history: '/requests/history',
}

export const k_request_types = {
  saved: 'Saved',
  invitation: 'Invitation',
  in_bidding: 'In Bidding',
  not_planned: 'Not Planned',
  awarded: 'Awarded',
  ongoing: 'Ongoing',
  completed: 'Completed',
  history: 'History',
}


export const k_page_titles = {
  'home': 'Limadi | Home',
  'requests': 'Limadi | Requests',
  'request_details': 'Limadi | Requests Details',
}


/** awarded request cancel delete status   
  company_reject
  cancel_req_company
  cancel_req_customer
  customer_reject
  delete_req_customer
*/
export const k_arcd_status = {
  cancel_req_customer: 'cancel_req_customer',
  delete_req_customer: 'delete_req_customer',
  cancel_req_company: 'cancel_req_company',
  customer_reject: 'customer_reject',
  company_reject: 'company_reject',
  init: 'init',
}

export const k_cr_actions = {
  next: 'next',
  back: 'back',
  save: 'save',
  submit: 'submit',
}

export const k_cr_status = {
  init: 'init',
  shift: 'shift',
  company: 'company',
  summary: 'summary',
}

export const k_home_card_types = {
  in_bidding: 'in_bidding',
  ongoing: 'ongoing',
  awarded: 'awarded',
}

export const k_data_set = {
  all_requests: 'all',
  saved: 'saved',
  invitation: 'invitations',
  in_bidding: 'in_bidding',
  not_planned: 'not_planned',
  awarded: 'awarded',
  ongoing: 'ongoing',
  completed: 'complete',
  history: 'history',
  global: 'global',
}

export const k_orderBy = {
  title: 'title',
  transport_type: 'transport_type',
  stops_count: 'stops_count',
  submitted_to: 'submitted_to',
  pickup_starts_date: 'pickup_starts_date',
  min_budget: 'min_budget',
  awarded_company: 'awarded_company',
  awarded_budget: 'awarded_budget',
  pickup_starts_at: 'pickup_starts_at',
  status: 'status',
  last_saved: 'last_saved',
  req_expected_complete_at: 'req_expected_complete_at',
  completed_at: 'completed_at',
  budget: 'budget',
  customer_from: 'customer_from',
  driver_name: 'driver_name',
  date_and_time: 'date_and_time',
  date_and_time_raw: 'date_and_time_raw',
  name: 'name',
  email: 'email',
  phone_from_company: 'phone_from_company',
  joined_date: 'joined_date_raw',
  car_license_plate_number: 'car_license_plate_number',
  license_start: 'license_start',
  license_start_raw: 'license_start_raw',
  license_status: 'license_status',
  city: 'city',
  shift_date_time_raw: 'shift_date_time_raw',
  car_number: 'car_number',
  location: 'location',
  shift_date_time: 'shift_date_time',
  left_in: 'left_in',
  my_bid: 'my_bid',
}

export const k_fav_address_order_by = {
  title: 'title',
  address: 'address',
  note: 'note',
}

export const k_fav_company_order_by = {
  name: "name",
  city: "city",
  email: "email",
  phone: "phone",
  rate: "rate"
}

export const k_Notification_order_by = {
  title: "title",
  details: "description",
  created_date: "created_at",
  status: "status",

}