import { authUserSession } from '@/libs/auth-libs'
import Image from 'next/image'
import Link from 'next/link'

const Page = async () => {
  const user = await authUserSession()
  return (
    <div className="mt-8 text-color-primary flex justify-center items-center flex-col">
      <h5 className="text-2xl font-bold">Wellcome, {user.name}</h5>
      <Image src={user.image} alt="useraccount" width={250} height={250} />
      <div className="flex gap-4 py-8 flex-warp">
        <Link
          href="/users/dashboard/collection"
          className="bg-color-accent text-color-dark font-bold py-3 px-4 text-xl"
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/comment"
          className="bg-color-accent text-color-dark font-bold py-3 px-4 text-xl"
        >
          My Comment
        </Link>
      </div>
    </div>
  )
}

export default Page
