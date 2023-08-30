
import qs from 'query-string'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons/lib"

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
}
const CategoryBox:React.FC<Props> = ({icon: Icon, label,selected}) => {
  const router = useRouter()
  const params = useSearchParams()

  // when a category is clicked it is added to url. When we click that category again it's removed from url.
  const handleClick = useCallback(() => {
    let currentQuery = {}

    if(params){
      currentQuery = qs.parse(params.toString()) // we need this query-string pkg because it converts all the params to objects
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };
    
    // remove cat when clicked two times
    if(params?.get('category') === label){
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, {skipNull: true}) //we skip options will null value

    router.push(url);

  }, [label, params, router])

  return (
    <div 
    onClick={handleClick}
    className={`
      flex 
      flex-col 
      items-center 
      justify-center 
      gap-2 
      p-3 
      border-b-2 
      hover:text-neutral-800 
      transition 
      cursor-pointer
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}  
    `}>
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  )
}
export default CategoryBox