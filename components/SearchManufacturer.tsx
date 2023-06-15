"use client"
import { SearchManufacturerProps } from '@/types'
import React, { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { manufacturers } from '@/constants'
import { CheckIcon } from '@heroicons/react/20/solid'

function SearchManufacturer({ selected, setSelected }: SearchManufacturerProps) {

    const [query, setquery] = useState("")


    const filteredManuFacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((car) =>
                car
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return (
        <div className="search-manufacturer">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]"
                    >
                        <Image src="/car-logo.svg"
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='Car Logo'
                        />
                    </Combobox.Button>

                    <Combobox.Input
                        className="search-manufacturer__input"
                        placeholder='Volkswagen'
                        displayValue={(item: string) => item}
                        onChange={(e) => setquery(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setquery('')}
                    >
                        <Combobox.Options>
                            {filteredManuFacturers.length === 0 && query !== "" ? (
                                <Combobox.Option
                                    value={query}
                                    className="search-manufacturer__option"
                                >
                                    Nothing found.
                                </Combobox.Option>
                            )

                                : (
                                    filteredManuFacturers.map((car) => (
                                        <Combobox.Option
                                            key={car}
                                            className={({ active }) => `
                                            relative search-manufacturer__option
                                            ${active ? 'bg-primary-blue text-white' : 'text - gray - 900'}
                                        ` }
                                            value={car}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {car}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )
                            }

                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox >
        </div >
    )
}

export default SearchManufacturer