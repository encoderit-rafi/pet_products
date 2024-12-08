import { Outlet } from 'react-router-dom'

export default function DefaultLayout() {
 return (

  <main className="h-svh overflow-hidden bg-green-100">
   <Outlet />
  </main>

 )
}
