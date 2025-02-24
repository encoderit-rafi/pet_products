import { useState, useEffect, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchUsers = async ({ pageParam = 1, search = "" }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users?q=${search}&_page=${pageParam}&_limit=5`
  );
  return { data, nextPage: data.length === 5 ? pageParam + 1 : null };
};

export default function UserComboBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const listRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["users", query],
    queryFn: ({ pageParam }) => fetchUsers({ pageParam, search: query }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  const users = data?.pages.flatMap((page) => page.data) || [];

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setQuery(searchTerm);
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <div className="relative w-full">
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        <div className="relative">
          <ComboboxInput
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 text-black border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <ComboboxOptions
            ref={listRef}
            className="absolute w-full mt-2 overflow-auto !bg-black border rounded-md shadow-md max-h-40"
            onScroll={handleScroll}
          >
            {users.length > 0 ? (
              users.map((user) => (
                <ComboboxOption key={user.id} value={user}>
                  {({ active, selected }) => (
                    <li
                      className={`px-3 py-2 cursor-pointer ${
                        active ? "bg-blue-500 text-white" : "bg-white"
                      }`}
                    >
                      {selected && "✔ "} {user.name}
                    </li>
                  )}
                </ComboboxOption>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No users found</li>
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
