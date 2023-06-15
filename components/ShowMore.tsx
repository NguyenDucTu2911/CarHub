"use client"
import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import CustomButton from "./CustomButton"
import { updateSearchParams } from "@/utils"

function ShowMore({ pageNumber, isNext, setLimit }: ShowMoreProps) {

  const HendleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    setLimit(newLimit)
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={HendleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore