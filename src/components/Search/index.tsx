import { Input } from "@/components/ui/input"

const Search = () => {
  return (
    <div className="relative flex w-[300px] items-center">
      {" "}
      <img src="/icons/search.svg" alt="search" className="w-3.4 absolute left-3 h-3.5" />
      <Input
        className="h-9 rounded-[10px] bg-white py-[11px] pr-4 pl-10 shadow-[0px_3px_3px_#00000026]"
        type="search"
        aria-label="Search"
      />{" "}
    </div>
  )
}

export default Search
