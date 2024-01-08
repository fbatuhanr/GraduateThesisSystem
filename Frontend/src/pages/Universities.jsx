import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {serverAddress} from "../settings";

import {useSelector} from "react-redux";

import { MdOutlineSchool, MdSchool } from "react-icons/md";
const Universities = () => {

    const preferences = useSelector(({PreferencesSlice}) => PreferencesSlice.preferences);

    const [universities, setUniversities] = useState(null);

    const [newUniversityName, setNewUniversityName] = useState("");
    const refs = useRef([]);

    useEffect(() => {

        axios.get(`${serverAddress}/universities`)
            .then((response) => {

                console.log(response.data)
                setUniversities(response.data)
            });

    }, []);

    const handleAddNewSubmit = (e) => {
        e.preventDefault();

        axios.post(`${serverAddress}/university`, {
            name: newUniversityName,
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    const handleUpdateButton = (id, refIndex) => {

        axios.put(`${serverAddress}/university/${id}`, {
            name: refs.current[refIndex].value
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }
    const handleRemoveButton = async (id) => {

        axios.delete(`${serverAddress}/university/${id}`)
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="p-3">
            <h1 className="text-3xl text-gray-900 dark:text-white text-center mb-1 py-6">
                Universities
            </h1>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
                {
                    universities && universities.map((data, index) =>
                        <div className="grid gap-6 mb-1 md:grid-cols-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    {preferences.theme === "dark" ? <MdOutlineSchool size="1.5em"/> : <MdSchool size="1.5em"/>}
                                </div>
                                <input type="text" id={data.UniversityID}
                                       className="block w-full p-4 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       defaultValue={data.Name}
                                       ref={(e) => refs.current[index] = e}
                                />
                                <button type="button" className="text-white absolute end-24 mr-1 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={() => handleUpdateButton(data.UniversityID, index)}>
                                    Update
                                </button>
                                <button type="button" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        onClick={() => handleRemoveButton(data.UniversityID)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <form onSubmit={handleAddNewSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Add New University
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={newUniversityName}
                            onChange={e => setNewUniversityName(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type new university here..." required/>
                    </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Universities;