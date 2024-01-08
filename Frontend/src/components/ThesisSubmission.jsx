import React, {useEffect, useState} from 'react';
import axios from "axios";
import {serverAddress} from "../settings";
import Select from 'react-select';
import {useSelector} from "react-redux";
import { TagsInput } from "react-tag-input-component";

const ThesisSubmission = () => {

    const preferences = useSelector(({PreferencesSlice}) => PreferencesSlice.preferences);

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
    const [keywords, setKeywords] = useState([]);


    useEffect(() => {

        const getPersons = () => {
            axios.get(`${serverAddress}/persons`)
                .then((response) => {
                    setAuthorOptions(response.data)
                    console.log(response.data)
                });
        }
        const getUniversities = () => {
            axios.get(`${serverAddress}/universities`)
                .then((response) => {
                    setUniversityOptions(response.data)
                    console.log(response.data)
                });
        }
        const getInstitutes = () => {
            axios.get(`${serverAddress}/institutes`)
                .then((response) => {
                    setInstituteOptions(response.data)
                    console.log(response.data)
                });
        }

        const getThesisTypes = () => {
            axios.get("http://localhost:8081/thesis-types")
                 .then((response) => {

                     let result = flatEnumTextToArray(response.data[0].Type)

                     setTypeOptions(result);
                     console.log(result)
                });
        }
        const getThesisLanguages = () => {
            axios.get("http://localhost:8081/thesis-languages")
                .then((response) => {

                    let result = flatEnumTextToArray(response.data[0].Type)

                    setLanguageOptions(result);
                    console.log(result)
                });
        }


        const getSubjects = () => {
            axios.get(`${serverAddress}/subjects`)
                .then((response) => {
                    setSubjectOptions(response.data);
                    console.log(response.data)
                });
        }


        getPersons();
        getUniversities();
        getInstitutes();

        getThesisTypes();
        getThesisLanguages();

        getSubjects();

    }, []);

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


    const handleSubmission = e => {
        e.preventDefault();

        axios.post(`${serverAddress}/thesis`, {
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

    return (
        <div className="p-3">
            <h1 className="text-3xl text-gray-900 dark:text-white text-center mb-1 py-6">
                Thesis Submission
            </h1>
            <form onSubmit={handleSubmission}>
                <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                    <div>
                        <label htmlFor="author"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Author
                        </label>
                        <select id="author"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <option value="">Choose an author...</option>
                            {
                                authorOptions && authorOptions.map(i => <option key={i.PersonID} value={i.PersonID}>{i.Name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="university"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            University
                        </label>
                        <select id="university"
                                value={university}
                                onChange={e => setUniversity(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <option value="">Choose a university...</option>
                            {
                                universityOptions && universityOptions.map(i => <option key={i.UniversityID} value={i.UniversityID}>{i.Name}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="institute"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Institute
                        </label>
                        <select id="institute"
                                value={institute}
                                onChange={e => setInstitute(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <option value="">Choose an institute...</option>
                            {
                                instituteOptions && instituteOptions.map(i => <option key={i.InstituteID} value={i.InstituteID}>{i.Name}</option>)
                            }
                        </select>
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
                        <select id="type"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <option selected>Choose a type...</option>
                            {
                                typeOptions && typeOptions.map((type,i) => <option key={i} value={type}>{type}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pages"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pages</label>
                        <input
                               type="number"
                               id="pages"
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
                        <select id="language"
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required>
                            <option selected>Choose a language...</option>
                            {
                                languageOptions && languageOptions.map((language,i) => <option key={i} value={language}>{language}</option>)
                            }
                        </select>
                    </div>


                </div>


                <div className="grid gap-6 mb-6 md:grid-cols-1 border p-3 rounded bg-gray-100 dark:bg-gray-900">
                    <div>
                        <label htmlFor="subject"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Subjects
                        </label>
                        {
                            subjectOptions && <Select id="subject"
                                name="subject"
                                defaultValue={null}
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
                            <TagsInput
                                value={keywords}
                                onChange={setKeywords}
                                name="keywords"
                                placeHolder="Enter a keyword..."
                                classNames={{
                                    input: "rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                }}
                            />
                        </div>
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

export default ThesisSubmission;