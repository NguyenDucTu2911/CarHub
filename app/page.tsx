"use client"
import Image from 'next/image';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fetchCas } from '@/utils'
import { FilterProps } from '@/types';
import { fuels, yearsOfProduction } from '@/constants';
import { useEffect, useState } from 'react';
interface searchParamsProps {
  searchParams: FilterProps
}

export default function Home() {

  const [allCars, setallCars] = useState([])
  const [loading, setloading] = useState(false)

  //search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setloading(true)
    try {
      const result = await fetchCas({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
        pageNumber: 0
      })
      setallCars(result)
    } catch (e) {
      console.log(e)
    } finally {
      setloading(false)
    }

  }

  useEffect(() => {
    getCars()
  }, [fuel, year, limit, manufacturer, model])

  // const allCars = await fetchCas({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // }) 

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1
  //   || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y
      max-width" id='discover'>
        <div className="home__text-container">
          <h1 className='text-4x1
          font-extrabold'>Car catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer}
            setModel={setModel}
          />
          <div className="home__filter-container">
            <CustomFilter
              title="fuel"
              options={fuels}
              setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => <CarCard car={car} />)}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src="/loader.svg"
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className='text-black text-xl forn-bold'>oops, no results</h2>
            {/* <p>{allCars?.message}</p> */}
          </div>
        )}

      </div>
    </main>
  )
}
