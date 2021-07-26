import React, { Fragment } from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Button from './Button';

type NavItem = {
  name: string;
  href: string;
  current?: boolean;
};

const navigation: NavItem[] = [
  { name: 'About', href: '#', current: true },
  { name: 'Experience', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

interface NavLinkProps extends NavItem {
  index: number;
}

const NavLink: React.FC<NavLinkProps> = ({ name, href, index }) => {
  return (
    <Link key={name} href={href}>
      <a>
        <div className='font-mono text-accent-900 inline'>
          {String(index).padStart(2, '0') + '. '}
        </div>
        <div className='text-primary-100 hover:text-accent-800 inline'>
          {name}
        </div>
      </a>
    </Link>
  );
};

const NavBar = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          {/* Main Navbar Starts */}
          <nav className='fixed bg-primary-900 opacity-95 inset-0 z-40 w-full h-24 sm:h-36 px-8 sm:px-16'>
            {/* Container for navbar elements */}
            <div className='flex justify-between h-full items-center'>
              {/* Logo */}
              <div className='inline-flex'>
                <img
                  className='block w-8 h-8'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                />
              </div>
              {/* Nav Links for Big Screens */}
              <div className='hidden sm:block'>
                <div className='flex gap-x-7 items-center'>
                  {navigation.map((item: NavItem, index) => (
                    <NavLink
                      key={item.name}
                      index={index}
                      name={item.name}
                      href={item.href}
                    />
                  ))}
                  <Button href=''>Resume</Button>
                </div>
              </div>
              {/* Button for Mobile View */}
              <div className='sm:hidden'>
                <Disclosure.Button className='items-center text-primary-100 p-2 rounded-md hover:text-primary-200 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary-100'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-8 w-8' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-8 w-8' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </nav>

          <Disclosure.Panel className='sm:hidden'>
            {/* TODO: Change to: cubic-bezier(0.645, 0.045, 0.355, 1) */}
            <Transition.Root show={open}>
              <div className='fixed inset-0 overflow-hidden'>
                <Transition.Child
                  as={Fragment}
                  enter='transition opacity filter ease-in-out duration-150'
                  enterFrom='opacity-0 filter-none'
                  enterTo='opacity-100 filter'
                  leave='transition opacity filter ease-in-out duration-150'
                  leaveFrom='opacity-100 filter'
                  leaveTo='opacity-0 filter-none'
                >
                  {/* Overloay */}
                  <div className='absolute inset-0 bg-black bg-opacity-75 backdrop-blur-lg'></div>
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter='transition transform ease-in-out duration-150'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition transform ease-in-out duration-150'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <div className='relative bg-primary-900 ml-24 h-full opacity-75 firefox:opacity-95'>
                    <div className='flex flex-col h-full gap-y-10 justify-center items-center'>
                      {navigation.map((item: NavItem, index) => (
                        <NavLink
                          key={item.name}
                          index={index}
                          name={item.name}
                          href={item.href}
                        />
                      ))}
                      <Button href=''>Resume</Button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Transition.Root>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
