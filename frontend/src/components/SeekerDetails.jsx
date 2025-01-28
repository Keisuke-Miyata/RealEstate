import React from "react"
import { FaMoneyBill, FaCheck } from "react-icons/fa"
import { LuClock4 } from "react-icons/lu"
import { FaTruck } from "react-icons/fa6";

const SeekerDetails = ({ post }) => {
    return (
        <div className="bg-gray-300 mt-20 pl-10 pr-10 pt-10 pb-10">
            <h2>{post.name}</h2>
            <h2>{post.age} year old {post.gender}</h2>
            <hr />

            <div className="flex items-center gap-8 justify-evenly">
                <div className="flex items-center gap-4">
                    <div><FaMoneyBill size={30}/></div>
                    <ul className="text-center">
                        <li>{post.monthlyBudget} / month</li>
                        <li>Budget</li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <div><LuClock4 size={30}/></div>
                    <ul className="text-center">
                        <li>{post.max} months</li>
                        <li>Stay length</li>
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    <div><FaTruck size={30}/></div>
                    <ul className="text-center">
                        <li>{post.preffedMoveDate}</li>
                        <li>Move date</li>
                    </ul>
                </div>
            </div>

            <hr />
            <div className="pt-5 pb-5">
                <h1 className="text-[20px]">About me</h1>
                <p className="text-[15px] pt-2 pb-4">{post.introduction}</p>
                <ul className="flex flex-wrap gap-2">
                    {post.details.map((item, index) => (
                        <li key={index} className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-1">
                            <FaCheck />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="pt-5 pb-5">
                <h2 className="text-[20px]">Property preferences</h2>
                <h2 className="text-[20px]">DETAILS</h2>
                <ul>
                    {post.details.map((item, index) => (
                        <li key={index} className="text-[15px]">{item}</li>
                    ))}
                </ul>
            </div>
            <hr />
            <div className="pt-5 pb-5">
                <h1 className="text-[20px]">Preferred accommodation types</h1>
                <ul className="flex flex-wrap gap-2 pt-5">
                    {post.details.map((item, index) => (
                        <li key={index} className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-1">
                            <FaCheck />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <hr/>
            <div className="pt-5 pb-5">
                <h2>Preffered locations</h2>
                <ul className="flex flex-wrap gap-2 pt-5">
                    {post.details.map((item, index) => (
                        <li key={index} className="flex items-center gap-1 rounded-full bg-gray-500 px-2 py-1">
                            <FaCheck />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SeekerDetails