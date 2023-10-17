import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className='text-4xl'>Home</h1>
         <Link href="/signup">Signup</Link>
      </div>

    </main>
  )
}
