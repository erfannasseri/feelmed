import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../assets/images/logo-gray.png"


export const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-56">
    <div
      className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
    >
      <div className="mb-4 md:mb-0">
        <Image src={logo} alt="Logo" className="h-8 w-auto" />
      </div>
      <div
        className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
      >
        <ul className="flex space-x-4">
          <li><a href="/packages/medical">Medical</a></li>
          <li><a href="/packages/cosmetic">Cosmetic</a></li>
          <li><a href="/packages/lifeStyle">LifeStyle</a></li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">
          &copy; 2024 Feelco. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">
          designed by <Link href="https://erfannasseri.ir" target='_blank'>Erfan Nasseri</Link>.
        </p>
      </div>
    </div>
  </footer>
  )
}
