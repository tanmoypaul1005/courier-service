/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

export default function Dropdown({ width = 56, button, body, className, visible = "visible" }) {
    return (
        <Menu as="div" className={`relative text-left h-10 inline-block ${className} w-full `}>
            <Menu.Button aria-expanded="true" className="inline-block justify-left w-full text-sm font-medium text-gray-700">
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
            >
                <Menu.Items className={`origin-top-right absolute right-0 mt-2 w-${width} rounded-br5 shadow-c1 bg-white focus:outline-none z-40 outline-none`}>
                    <div className="py-0">
                        {body}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}