import {Link} from 'react-router-dom'
export default function Sign() {
    return(
        <>
        <div className="w-full min-h-4  justify-end flex bg-gray-100">
        <ul className='flex p-3 font-semibold'>
    <Link 
        to='/signin' 
        className="text-gray-700 underline underline-offset-1 mr-5 transition duration-300 hover:text-indigo-900 hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:scale-105 pl-3 pr-3 rounded-full"
    >
        Enter
    </Link>
    <Link 
        to='/signup' 
        className='text-gray-500 underline underline-offset-1 mr-5 transition duration-300 hover:text-indigo-900 hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:scale-120 pl-3 pr-3 rounded-full'
    >
        Registor
    </Link>
</ul>

        </div>
        </>
    )
}