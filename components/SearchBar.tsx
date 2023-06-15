"use client"
import React, { useState } from 'react'
import SearchManufacturer from './SearchManufacturer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SearchSearchBarProps } from '@/types'

const SearchButton = ({ otherClases }: { otherClases: string }) => (
    <button type='submit' className={`-ml-8 z-10 ${otherClases}`}>
        <Image src="/magnifying-glass.svg"
            alt="magnifying glass"
            height={40}
            width={40}
            className='object-contain'
        />
    </button>
)

function SearchBar({ setManufacturer, setModel }: SearchSearchBarProps) {
    const [searchManufacturer, setSearchManufacturer] = useState("");
    const [searchModel, setSearchModel] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchManufacturer === "" && searchModel === "") {
            return alert("please fill in the search bar")
        }
        setModel(searchModel)
        setManufacturer(searchManufacturer)

    }

    return (
        <form className='searchbar'
            onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
                />
                <SearchButton otherClases={"sm:hidden"} />
            </div>

            <div className="searchbar__item">
                <Image src={"/model-icon.png"}
                    alt='model icon'
                    width={20}
                    height={20}
                    className='absolute w-[20px] h-[20px] ml-4'
                />
                <input type='text'
                    className='searchbar__input'
                    name='model'
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                    placeholder='Tiguan'
                />
                <SearchButton otherClases='sm:hidden' />
            </div>
            <SearchButton otherClases='max-sm:hidden' />
        </form>
    )
}

export default SearchBar