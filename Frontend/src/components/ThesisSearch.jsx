import React, {useEffect, useState} from 'react';
import {IoPersonCircle, IoPersonCircleOutline} from "react-icons/io5";
import axios from "axios";
import {serverAddress} from "../settings.js";

import {Link} from "react-router-dom";


const searchCriteriaTypes = {
    Title: "Title",
    Abstract: "Abstract"
}
const ThesisSearch = () => {

    const [results, setResults] = useState([]);

    const [searchCriteria, setSearchCriteria] = useState(searchCriteriaTypes.Title);
    const [searchText, setSearchText] = useState(null);

    const [author, setAuthor] = useState(null);
    const [authorOptions, setAuthorOptions] = useState(null);

    const [supervisor, setSupervisor] = useState(null);
    const [supervisorOptions, setSupervisorOptions] = useState(null);

    const [university, setUniversity] = useState(null);
    const [universityOptions, setUniversityOptions] = useState(null);

    const [instituteOptions, setInstituteOptions] = useState(null);
    const [institute, setInstitute] = useState(null);

    const [type, setType] = useState(null);
    const [typeOptions, setTypeOptions] = useState(null);

    const [language, setLanguage] = useState(null);
    const [languageOptions, setLanguageOptions] = useState(null);

    const [year, setYear] = useState(null);

    const fetchThesis = () => {
        axios.get(`${serverAddress}/thesis`)
            .then((response) => {

                console.log(response.data)
                setResults(response.data)
            });
    }
    useEffect(() => {

        fetchThesis();

        axios.get(`${serverAddress}/persons`)
            .then((response) => {
                setAuthorOptions(response.data)
                console.log(response.data)
            });

        axios.get(`${serverAddress}/supervisors`)
            .then((response) => {
                setSupervisorOptions(response.data)
                console.log(response.data)
            });

        axios.get(`${serverAddress}/universities`)
            .then((response) => {
                setUniversityOptions(response.data)
                console.log(response.data)
            });

        axios.get(`${serverAddress}/institutes`)
            .then((response) => {
                setInstituteOptions(response.data)
                console.log(response.data)
            });

        axios.get(`${serverAddress}/thesis-types`)
            .then((response) => {

                let result = flatEnumTextToArray(response.data[0].Type)

                setTypeOptions(result)
                console.log(result)
            });

        axios.get("http://localhost:8081/thesis-languages")
            .then((response) => {

                let result = flatEnumTextToArray(response.data[0].Type)

                setLanguageOptions(result);
                console.log(result)
            });


    }, [])

    const handleSearchSubmission = (e) => {
        e.preventDefault();

        axios.post(`${serverAddress}/thesis-search`, {
            authorId: author,
            supervisorId: supervisor,
            universityId: university,
            instituteId: institute,
            title: searchCriteria === searchCriteriaTypes.Title ? searchText : null,
            abstract: searchCriteria === searchCriteriaTypes.Abstract ? searchText : null,
            type,
            year,
            language
        })
            .then((response) => {
                // window.location.reload();
                console.log(response)
                setResults(response.data.length > 0 ? response.data : null);
            })
            .catch(error => {
                console.error(error);
                setResults(null)
            });
    }

    const makeShorter = (str, wordCount) => {
        return str.split(/\s+/).slice(0, wordCount).join(" ") + "...";
    }
    function flatEnumTextToArray(flatText){

        // flatText = enum('a','b');
        let enumContent = /\(([^)]+)\)/.exec(flatText)[1];  // 'a','b'
        let result = enumContent.replaceAll("'","").split(','); // [a,b]

        return result;
    }
    return (
        <div className="p-3">
            <h1 className="text-3xl text-gray-900 dark:text-white text-center mb-1 py-6">
                Thesis Search
            </h1>
            <div>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <form onSubmit={handleSearchSubmission}>
                        <div className="flex mb-2">
                            <label htmlFor="search-dropdown"
                                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                            <button id="dropdown-button" data-dropdown-toggle="dropdown"
                                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                    type="button">{searchCriteria === null ? "Search Criteria" : searchCriteria}
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg></button>
                            <div id="dropdown"
                                 className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                    <li>
                                        <button type="button" onClick={() => setSearchCriteria(searchCriteriaTypes.Title)}
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            {searchCriteriaTypes.Title}
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={() => setSearchCriteria(searchCriteriaTypes.Abstract)}
                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            {searchCriteriaTypes.Abstract}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative w-full">
                                <input type="search" id="search" name="search"
                                       className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                       placeholder="Search for title, abstract..."
                                       value={searchText}
                                       onChange={e => setSearchText(e.target.value)}
                                />
                            </div>
                        </div>

                        <div id="accordion-color" data-accordion="collapse"
                             data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                            <h2 id="accordion-color-heading-1">
                                <button type="button"
                                        className="flex items-center justify-between w-full p-3 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3"
                                        data-accordion-target="#accordion-color-body-1" aria-expanded="true"
                                        aria-controls="accordion-color-body-1">
                                    <span>Detailed Search</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2" d="M9 5 5 1 1 5"/>
                                    </svg>
                                </button>
                            </h2>
                            <div id="accordion-color-body-1"
                                 aria-labelledby="accordion-color-heading-1">
                                <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-800 dark:bg-gray-900">

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Author
                                        </div>
                                        <div className="relative w-full">
                                            <select id="author"
                                                    name="author"
                                                    value={author}
                                                    onChange={e => setAuthor(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option value="">Choose an author...</option>
                                                {
                                                    authorOptions && authorOptions.map(i => <option key={i.PersonID} value={i.PersonID}>{i.Name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Supervisor
                                        </div>
                                        <div className="relative w-full">
                                            <select id="supervisor"
                                                    value={supervisor}
                                                    onChange={e => setSupervisor(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option value="">Choose a supervisor...</option>
                                                {
                                                    supervisorOptions && supervisorOptions.map(i => <option key={i.PersonID} value={i.PersonID}>{i.Name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            University
                                        </div>
                                        <div className="relative w-full">
                                            <select id="language"
                                                    value={university}
                                                    onChange={e => setUniversity(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option selected>Choose a university...</option>
                                                {
                                                    universityOptions && universityOptions.map(i => <option key={i.UniversityID} value={i.UniversityID}>{i.Name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Institute
                                        </div>
                                        <div className="relative w-full">
                                            <select id="language"
                                                    value={institute}
                                                    onChange={e => setInstitute(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option selected>Choose an institute...</option>
                                                {
                                                    instituteOptions && instituteOptions.map(i => <option key={i.InstituteID} value={i.InstituteID}>{i.Name}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Type
                                        </div>
                                        <div className="relative w-full">
                                            <select id="type"
                                                    value={type}
                                                    onChange={e => setType(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option value="">Choose a type...</option>
                                                {
                                                    typeOptions && typeOptions.map((type,i) => <option key={i} value={type}>{type}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Start Year
                                        </div>
                                        <div className="relative w-full">
                                            <input
                                                type="number"
                                                id="year"
                                                value={year}
                                                onChange={e => setYear(e.target.value)}
                                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                                placeholder="Enter a year..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex my-1">
                                        <div className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                            Language
                                        </div>
                                        <div className="relative w-full">
                                            <select id="language"
                                                    value={language}
                                                    onChange={e => setLanguage(e.target.value)}
                                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            >
                                                <option selected>Choose a language...</option>
                                                {
                                                    languageOptions && languageOptions.map((language,i) => <option key={i} value={language}>{language}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="grid gap-1 mb-6 md:grid-cols-1">
                            <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Search
                            </button>
                            <button type="button" onClick={() => window.location.reload()}
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Abstract
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            results && results.map((data, index) =>
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {makeShorter(data.Title, 3)}
                                    </th>
                                    <td className="px-6 py-4">
                                        {makeShorter(data.Abstract, 5)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {authorOptions && authorOptions.find(i => i.PersonID === data.AuthorID).Name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.Type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.Year}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/thesis/${data.ThesisNo}`}
                                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ThesisSearch;