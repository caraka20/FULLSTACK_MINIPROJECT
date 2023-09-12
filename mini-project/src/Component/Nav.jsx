"use client";

import axios from "axios";
import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarWithCTAButton(props) {
  return (
    <div className="sticky top-0 grid">
      <Navbar className="sm:mx-24 mx-10 flex">
        <Navbar.Brand>
          <Link to={"/"}>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              EventQu
            </span>
          </Link>
        </Navbar.Brand>
        <div className="md:order-2 flex gap-2 justify-center items-center">
          {props.pengguna !== null ? (
            <>
            <Link to={`/dashboard/${props.pengguna}`}>
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
            </>

          ) : (
            <Link to={"/login"} className="flex gap-3">
              <Button className="">Masuk/Daftar</Button>
              {/* <Navbar.Toggle className=''/> */}
            </Link>
          )}
          <Navbar.Toggle className="" />
        </div>
        <Navbar.Collapse>
          <Link to={"/"}>
            <Navbar.Link>
              <p>Home</p>
            </Navbar.Link>
          </Link>
          {props.pengguna !== null ? (
            <>
              <Link to={"/create_event"}>
                <Navbar.Link>Create Event</Navbar.Link>
              </Link>
            </>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
