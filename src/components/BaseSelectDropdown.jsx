import BoxIcon from '@/assets/icons/BoxIcon'
import CheckIcon from '@/assets/icons/CheckIcon'
import DownIcon from '@/assets/icons/DownIcon'
import cn from '@/lib/utils/cn'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
// import clsx from 'clsx'
import { useState } from 'react'

const people = [
 { id: 1, name: 'Tom Cook' },
 { id: 2, name: 'Wade Cooper' },
 { id: 3, name: 'Tanya Fox' },
 { id: 4, name: 'Arlene Mccoy' },
 { id: 5, name: 'Devon Webb' },
]

export default function BaseSelectDropdown() {
 const [selected, setSelected] = useState(people[1])

 return (
  <div className="mx-auto w-full">
   <Listbox value={selected} onChange={setSelected} >
    <ListboxButton
     className={cn(
      'relative block w-full rounded-lg bg-white/5 py-3 pr-8 border border-custom_line_one pl-3 text-left text-sm/6 text-white',
      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
     )}
    >
     <span>

      {selected.name}
     </span>
     <DownIcon
      className="group pointer-events-none absolute top-1/2  -translate-y-1/2 right-4 size-4 fill-white/60"
      aria-hidden="true"
     />
    </ListboxButton>
    <ListboxOptions
     anchor="bottom"
     transition
     className={cn(
      'w-[var(--button-width)] z-[60] mt-1 rounded-xl border border-white/5 !bg-[#21272b] p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
     )}
    >
     {people.map((person) => (
      <ListboxOption
       key={person.name}
       value={person}
       className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
      >
       <CheckIcon className="invisible size-4 text-white group-data-[selected]:visible" />
       <div className="text-sm/6 text-white">{person.name}</div>
      </ListboxOption>
     ))}
    </ListboxOptions>
   </Listbox>
  </div>
 )
}
