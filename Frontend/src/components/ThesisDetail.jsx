import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {IoPersonCircle, IoPersonCircleOutline} from "react-icons/io5";
import axios from "axios";
import {serverAddress} from "../settings.js";
import {useSelector} from "react-redux";
import Select from "react-select";
import {TagsInput} from "react-tag-input-component";

const ThesisDetail = () => {

    const {id} = useParams();

    const user = useSelector(({UserSlice}) => UserSlice.user);
    const preferences = useSelector(({PreferencesSlice}) => PreferencesSlice.preferences);

    const [thesis, setThesis] = useState(null);
    const [thesisSubject, setThesisSubject] = useState(null);

    const [authorOptions, setAuthorOptions] = useState(null);
    const [universityOptions, setUniversityOptions] = useState(null);
    const [instituteOptions, setInstituteOptions] = useState(null);

    const [typeOptions, setTypeOptions] = useState(null);
    const [languageOptions, setLanguageOptions] = useState(null);

    const [subjectOptions, setSubjectOptions] = useState(null);

    const [author, setAuthor] = useState(null);
    const [university, setUniversity] = useState(null);
    const [institute, setInstitute] = useState(null);
    const [title, setTitle] = useState(null);
    const [abstract, setAbstract] = useState(null);
    const [year, setYear] = useState(null);
    const [type, setType] = useState(null);
    const [pages, setPages] = useState(null);
    const [language, setLanguage] = useState(null);
    const [subject, setSubject] = useState(null);
    const [keywords, setKeywords] = useState(null);

    useEffect(() => {

        const fetchThesis = axios.get(`${serverAddress}/thesis/${id}`)
            .then((response) => {

                let thesisData = response.data[0];
                console.log(thesisData);

                setThesis(thesisData);

                setAuthor(thesisData.AuthorID);
                setUniversity(thesisData.UniversityID);
                setInstitute(thesisData.InstituteID)

                setTitle(thesisData.Title);
                setAbstract(thesisData.Abstract);
                setYear(thesisData.Year);
                setType(thesisData.Type);
                setPages(thesisData.Pages);
                setLanguage(thesisData.Language);
            });

        const fetchSubjects =
            axios.get(`${serverAddress}/subjects`)
            .then((response) => {

                let subjectsData = response.data;
                console.log(subjectsData)

                setSubjectOptions(subjectsData);

                const fetchThesisSubject = axios.get(`${serverAddress}/thesis-subject/${id}`)
                    .then((response) => {

                        let thesisSubjectsData = response.data;
                        console.log(thesisSubjectsData)

                        setThesisSubject(thesisSubjectsData)

                        setSubject(thesisSubjectsData.map(i => { return {label: subjectsData.find(x => x.SubjectID === i.SubjectID).Topic, value: i.SubjectID} }));
                    });

            });

        const fetchThesisKeyword = axios.get(`${serverAddress}/thesis-keyword/${id}`)
            .then((response) => {

                console.log(response.data)
                setKeywords(response.data.map(i=>i.Word))
            });

        const fetchPersons = axios.get(`${serverAddress}/persons`)
            .then((response) => {

                setAuthorOptions(response.data)
                console.log(response.data)
            });

        const fetchUniversities = axios.get(`${serverAddress}/universities`)
            .then((response) => {

                setUniversityOptions(response.data)
                console.log(response.data)
            });

        const fetchInstitutes = axios.get(`${serverAddress}/institutes`)
            .then((response) => {

                setInstituteOptions(response.data)
                console.log(response.data)
            });

        const fetchThesisTypes = axios.get("http://localhost:8081/thesis-types")
            .then((response) => {

                let result = flatEnumTextToArray(response.data[0].Type)

                setTypeOptions(result);
                console.log(result)
            });

        const fetchThesisLanguages = axios.get("http://localhost:8081/thesis-languages")
            .then((response) => {

                let result = flatEnumTextToArray(response.data[0].Type)

                setLanguageOptions(result);
                console.log(result)
            });

    }, [])

    const handleRemoveButton = (id) => {

        axios.delete(`${serverAddress}/thesis/${id}`)
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    const handleUpdateSubmission = e => {
        e.preventDefault();

        axios.put(`${serverAddress}/thesis/${id}`, {
            authorId: author,
            universityId: university,
            instituteId: institute,
            title,
            abstract,
            year,
            type,
            pages,
            language,
            subjects: subject.map(i => i.value),
            keywords
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    }

    function flatEnumTextToArray(flatText){

        // flatText = enum('a','b');
        let enumContent = /\(([^)]+)\)/.exec(flatText)[1];  // 'a','b'
        let result = enumContent.replaceAll("'","").split(','); // [a,b]

        return result;
    }
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: preferences.theme === "dark" ? "#374151" : "#f9fafb",
            // match with the menu
            borderRadius: 5,
            // Overwrittes the different states of border
            borderColor: preferences.theme === "dark" ? "#4b5563" : "#d1d5db",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: "#3b82f6"
            }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };

    return (
        <div className="p-3">
            <h1 className="text-3xl text-gray-900 dark:text-white text-center m-0 pt-6 pb-1">
                Thesis Detail
            </h1>
            <h3 className="text-sm text-gray-900 dark:text-white text-center m-0 p-3 italic">
            {
                user.username
                    ? <p className="text-green-500">You can edit thesis</p>
                    : <p className="text-red-400">Please log in to edit the thesis!</p>
            }
            </h3>
            {
            thesis &&
            <div>
                <form onSubmit={handleUpdateSubmission}>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                        <div>
                            <label htmlFor="author"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Author
                            </label>
                            {
                                authorOptions &&
                                <select id="author"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required>
                                        <option value="">Choose an author...</option>
                                        {authorOptions.map(i => <option key={i.PersonID} value={i.PersonID}>{i.Name}</option>)}
                                </select>
                            }
                        </div>
                        <div>
                            <label htmlFor="university"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                University
                            </label>
                            {
                                universityOptions &&
                                <select id="university"
                                    value={university}
                                    onChange={e => setUniversity(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required>
                                        <option value="">Choose a university...</option>
                                        {universityOptions.map(i => <option key={i.UniversityID} value={i.UniversityID}>{i.Name}</option>)}
                                </select>
                            }
                        </div>
                        <div>
                            <label htmlFor="institute"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Institute
                            </label>
                            {
                                instituteOptions &&
                                <select id="institute"
                                    value={institute}
                                    onChange={e => setInstitute(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required>
                                        <option value="">Choose an institute...</option>
                                        {instituteOptions.map(i => <option key={i.InstituteID} value={i.InstituteID}>{i.Name}</option>)}
                                </select>
                            }
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Type thesis title here..." required/>
                        </div>
                        <div>

                            <label
                                htmlFor="abstract"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Abstract
                            </label>
                            <textarea id="abstract"
                                      rows="4"
                                      value={abstract}
                                      onChange={e => setAbstract(e.target.value)}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write thesis abstract here..." required>
                        </textarea>
                        </div>
                        <div>
                            <label htmlFor="year"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                            <input
                                type="number"
                                id="year"
                                value={year}
                                onChange={e => setYear(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter year..." required/>
                        </div>
                        <div>
                            <label htmlFor="type"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Type
                            </label>
                            {
                                typeOptions &&
                                <select id="type"
                                    defaultValue={thesis.Type}
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required>
                                        <option selected>Choose a type...</option>
                                        {typeOptions.map((type,i) => <option key={i} value={type}>{type}</option>)}
                                </select>
                            }
                        </div>
                        <div>
                            <label htmlFor="pages"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
                            <input
                                type="number"
                                id="pages"
                                defaultValue={thesis.Pages}
                                value={pages}
                                onChange={e => setPages(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter page number..." required/>
                        </div>
                        <div>
                            <label htmlFor="language"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Language
                            </label>
                            {
                                languageOptions &&
                                <select id="language"
                                    defaultValue={thesis.Language}
                                    value={language}
                                    onChange={e => setLanguage(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required>
                                        <option selected>Choose a language...</option>
                                        {languageOptions.map((language,i) => <option key={i} value={language}>{language}</option>)}
                                </select>
                            }
                        </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                        <div>
                            <label htmlFor="subject"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Subjects
                            </label>
                            {
                                subjectOptions && thesisSubject &&
                                <Select id="subject"
                                          name="subject"
                                          isMulti
                                          styles={customStyles}
                                          options={subjectOptions.map(i => { return {label: i.Topic, value: i.SubjectID} })}
                                          className="basic-multi-select"
                                          classNamePrefix="select"
                                          placeholder="Choose one or more topics..."
                                          onChange={choice => setSubject(choice)}
                                          value={subject}
                                />
                            }
                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="keyword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Keywords
                                </label>
                                {
                                    keywords &&
                                    <TagsInput
                                        value={keywords}
                                        onChange={setKeywords}
                                        name="keywords"
                                        placeHolder="Enter a keyword..."
                                        classNames={{
                                            input: "rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        }}
                                    />
                                }
                            </div>
                        </div>
                    </div>

                    {
                        user.username &&
                        <div>
                            <div className="grid gap-6 mb-3 md:grid-cols-1">
                                <button
                                    type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Update
                                </button>
                            </div>
                            <div className="grid gap-6 mb-6 md:grid-cols-1">
                                <button type="button"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={handleRemoveButton}
                                >
                                Remove
                                </button>
                            </div>
                        </div>
                    }

                </form>
            </div>
            }
        </div>
    );
};

export default ThesisDetail;