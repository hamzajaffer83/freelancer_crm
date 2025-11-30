'use client'

import { type CustomerStatus } from "@/type/data";

const CustomerStatusTable = ({ data } : { data : CustomerStatus[] }) => {
    return (
        <section>
            <table className="overflow-x-auto w-full">
                <thead className="bg-gray-50">
                    <tr className="border-b">
                        <th className="w-1/4 py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Id
                        </th>
                        <th className="w-1/4 py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Name
                        </th>
                        <th className="w-1/4 py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Tag Color
                        </th>

                        <th className="w-1/4 py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Active
                        </th>
                        <th className="w-1/4 py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    { data.map((item: CustomerStatus) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                            <td className="py-3 px-4">{item.id}</td>

                            <td className="py-3 px-4">{item.name}</td>

                            <td className="py-3 px-4">
                                <div className="w-5 h-5 rounded-sm" style={{backgroundColor: item.color}} />
                            </td>

                            <td className="py-3 px-4">{item.active ? '1' : '0'}</td>

                            <td className="py-3 px-4">
                                <div className="flex justify-end space-x-3">
                                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                        Delete
                                    </button>

                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) }

                </tbody>
            </table>
        </section>
    );
}

export default CustomerStatusTable;