import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function FreeDropDown({
  width = "w-56",
  button,
  body,
  className,
  shadowCustom = "shadow-c1",
  onUiUpdate = () => { },
}) {

  return (
    <Menu as="div" className={`relative w-full text-left ${className}`}>
      <Menu.Button
        aria-expanded="true"
        className="flex justify-center items-center w-full text-sm font-medium text-gray-700"
      >
        {button}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterEnter={() => { onUiUpdate(true) }}
        afterLeave={() => { onUiUpdate(false) }}
      >
        <Menu.Items

          className={`absolute right-0 z-40 mt-2 bg-white rounded-md origin-top-right outline-none ${width} ${shadowCustom} focus:outline-none`}
        >
          {/* {(e, close) => console.log("CLOSED", close)}
          <div  className="py-0">{body}</div> */}

          {({ close }) => (
            <div onClick={close} className="py-0">{body}</div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}