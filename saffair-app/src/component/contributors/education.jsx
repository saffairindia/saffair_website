import React, { useEffect, useState } from "react";

const Education = ({ updateEducationData }) => {
  const [educationDetails, setEducationDetails] = useState([
    {
      instituteName: '',
      degree: '',
      fieldOfStudy: '',
      grade: '',
      startDate: '',
      endDate: '',
    },
  ]);

  const gradeOptions = [
    { value: "", label: "Select Grade" },
    { value: "A", label: "85-100%" },
    { value: "B", label: "70-84%" },
    { value: "C", label: "55-69%" },
    { value: "D", label: "35-54%" },
    { value: "E", label: "0-34%" },
  ];

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...educationDetails];
    updatedDetails[index][name] = value;
    setEducationDetails(updatedDetails);
  };

  const handleAddEducation = () => {
    if (educationDetails.length < 2) {
      setEducationDetails([
        ...educationDetails,
        {
          instituteName: '',
          degree: '',
          fieldOfStudy: '',
          grade: '',
          startDate: '',
          endDate: '',
        },
      ]);
    }
  };

  const handleDeleteEducation = (index) => {
    const updatedDetails = educationDetails.filter((_, i) => i !== index);
    setEducationDetails(updatedDetails);
  };

  useEffect(() => {
    updateEducationData(educationDetails);
  }, [educationDetails, updateEducationData]);

  const renderEducationFields = () => {
    return educationDetails.map((education, index) => (
      <div key={index} className="Edudetails p-4 border rounded mb-4">
        <p className="edutag mb-4 font-bold">Education Details</p>
        <div className="thenames grid grid-cols-1 mb-2 md:grid-cols-4 sm:grid-cols-2 gap-4">
          <div>
            <label>
              Institute Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="instituteName"
              placeholder="Institute Name"
              value={education.instituteName}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label>
              Degree
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={education.degree}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label>
              Field of Study
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              placeholder="Field of Study"
              value={education.fieldOfStudy}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label>Grade</label>
            <select
              name="grade"
              value={education.grade}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {gradeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
          <div>
            <label>
              Start Month
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="month"
              name="startDate"
              value={education.startDate}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label>
              End Month
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="month"
              name="endDate"
              value={education.endDate}
              onChange={(e) => handleEducationChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        {index > 0 && (
          <button
            onClick={() => handleDeleteEducation(index)}
            className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          >
            Delete
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="p-4">
      {renderEducationFields()}
      <button
        onClick={handleAddEducation}
        disabled={educationDetails.length >= 2}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
      >
        Add Education
      </button>
    </div>
  );
};

export default Education;
