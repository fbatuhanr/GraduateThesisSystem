import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";
import {serverAddress} from "../settings";

import {useSelector} from "react-redux";
import {IoPersonCircle, IoPersonCircleOutline} from "react-icons/io5";
const Persons = () => {

    const preferences = useSelector(({PreferencesSlice}) => PreferencesSlice.preferences);

    const [persons, setPersons] = useState(null);

    const [newPersonName, setNewPersonName] = useState("");
    const personsRefs = useRef([]);

    useEffect(() => {

        axios.get(`${serverAddress}/persons`)
            .then((response) => {

                console.log(response.data)
                setPersons(response.data)
            });

    }, []);

    const handleAddNewButton = () => {

        axios.post(`${serverAddress}/person`, {
                name: newPersonName
            })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    const handleUpdateButton = (id, refIndex) => {

        axios.put(`${serverAddress}/person/${id}`, {
                name: personsRefs.current[refIndex].value
             })
             .then((response) => {
                 window.location.reload();
             })
             .catch(error => console.error(error));
    }
    const handleRemoveButton = async (id) => {

        axios.delete(`${serverAddress}/person/${id}`)
             .then((response) => {
                 window.location.reload();
             })
             .catch(error => console.error(error));
    }

    return (
        <div className="p-3">
            <h1 className="text-3xl text-gray-900 dark:text-white text-center mb-1 py-6">
                Persons
            </h1>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
                {
                    persons && persons.map((person, index) =>
                        <div className="grid gap-6 mb-1 md:grid-cols-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    {preferences.theme === "dark" ? <IoPersonCircleOutline size="1.5em"/> : <IoPersonCircle size="1.5em"/>}
                                </div>
                                    <input type="text" id={person.PersonID}
                                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           defaultValue={person.Name}
                                           ref={(e) => personsRefs.current[index] = e}
                                    />
                                    <button type="button" className="text-white absolute end-24 mr-1 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            onClick={() => handleUpdateButton(person.PersonID, index)}>
                                        Update
                                    </button>
                                    <button type="button" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            onClick={() => handleRemoveButton(person.PersonID)}>
                                        Remove
                                    </button>
                            </div>
                        </div>
                    )
                }
            </div>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Add New Person
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={newPersonName}
                            onChange={e => setNewPersonName(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Type new person name here..." required/>
                    </div>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <button type="button" onClick={handleAddNewButton}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Persons;