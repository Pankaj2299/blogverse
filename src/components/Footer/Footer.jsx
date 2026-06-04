import React from 'react'
import { Link } from "react-router-dom"
import { Logo } from '../index'

function Footer() {
    return (

        <section className="relative overflow-hidden py-16 bg-white border-t border-slate-200 mt-20">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">


                    <div>
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="h-full">
                            <h3 className="mb-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                                Connect
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <a
                                        href='https://linkedin.com/in/pankaj-kumar-4b3276266'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"

                                    >
                                        LinkedIn
                                    </a>

                                </li>
                                <li className="mb-4">
                                    <a
                                        href='https://github.com/Pankaj2299'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"

                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='mailto:pankajkumar199922@gmail.com'
                                        className=" text-base font-medium text-slate-700 hover:text-blue-600 transition-colors duration-200 hover:underline"

                                    >
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 text-center">

                <p className="text-sm text-slate-500">

                    © 2026 BlogVerse. All rights reserved.

                </p>

            </div>


        </section>

    )
}

export default Footer




