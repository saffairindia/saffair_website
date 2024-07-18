import React, { useState, useEffect } from 'react';
import Pincode from "react-pincode"
const WorkExperience = ({ updateWorkExperienceData }) => {
  const [workExperienceDetails, setWorkExperienceDetails] = useState([
    {
      companyName: '',
      position: '',
      fieldType: '',
      employmentType: '',
      companyCity: '',
      companyState: '',
      companyPincode: '',
      companyJoiningDate: '',
      companyEndDate: '',
    },
  ]);


  const employmentTypes = [
    { value: "", label: "Select Employment Type" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Self-employed", label: "Self-employed" },
    { value: "Freelance", label: "Freelance" },
    { value: "Internship", label: "Internship" },
    { value: "Trainee", label: "Trainee" },
  ];
  const fieldTypes = [
    { value: "", label: "Select Field" },
    { value: "Sales", label: "Sales" },
    { value: "Project Management", label: "Project Management" },
    { value: "IT", label: "IT" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Operations", label: "Operations" },
    { value: "Customer Service", label: "Customer Service" },
    { value: "Research and Development", label: "Research and Development" },
    { value: "Product Management", label: "Product Management" },
  ];


  const handleWorkExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...workExperienceDetails];
    updatedDetails[index][name] = value;
    setWorkExperienceDetails(updatedDetails);
  };

  const handleAddWorkExperience = () => {
    if (workExperienceDetails.length < 3) {
      setWorkExperienceDetails([
        ...workExperienceDetails,
        {
          companyName: '',
          position: '',
          fieldType: '',
          employmentType: '',
          companyCity: '',
          companyState: '',
          companyPincode: '',
          companyJoiningDate: '',
          companyEndDate: '',
        },
      ]);
    }
  };

  const handleDeleteWorkExperience = (index) => {
    const updatedDetails = workExperienceDetails.filter((_, i) => i !== index);
    setWorkExperienceDetails(updatedDetails);
  };

  useEffect(() => {
    updateWorkExperienceData(workExperienceDetails);
  }, [workExperienceDetails, updateWorkExperienceData]);

  const handlePincodeChange = (data, index) => {
    const updatedDetails = [...workExperienceDetails];
    updatedDetails[index].companyPincode = data.pincode;
    updatedDetails[index].companyCity = data.city;
    updatedDetails[index].companyState = data.stateName;
    setWorkExperienceDetails(updatedDetails);
  };


  const renderWorkExperienceFields = () => {
    return workExperienceDetails.map((work, index) => (
      <div key={index} className="workdetails p-4 border rounded mb-4">
        <p className="workag mb-4 font-bold">Work Details</p>
        <div className="thenames grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-2">
          <div>
            <label>
              Company Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={work.companyName}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label>
              Position
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={work.position}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label>
              Field
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="fieldType"
              value={work.fieldType}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              {fieldTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>
              Employment Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="employmentType"
              value={work.employmentType}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              {employmentTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="block font-medium text-gray-700">Company Location</label>
        <div className="flex flex-col md:flex-row justify-start gap-4 mt-2 mb-2">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Pincode<span className="text-red-500 ml-1">*</span>
            </label>
            <Pincode
              type="text"
              name="companyPincode"
              placeholder="Pincode"
              value={work.companyPincode}
              getData={(data) => handlePincodeChange(data, index)}
              invalidError="Please check pincode"
              lengthError="Check length"
              showArea={false}
              showState={false}
              showDistrict={false}
              showCity={false}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              City<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="companyCity"
              placeholder="City"
              value={work.companyCity}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              State<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="companyState"
              placeholder="State"
              value={work.companyState}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4">
          <div>
            <label>
              Joining Month
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="month"
              name="companyJoiningDate"
              value={work.companyJoiningDate}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label>
              End Month<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="month"
              name="companyEndDate"
              value={work.companyEndDate}
              onChange={(e) => handleWorkExperienceChange(e, index)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        {index > 0 && (
          <button
            onClick={() => handleDeleteWorkExperience(index)}
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
      {renderWorkExperienceFields()}
      <button
        onClick={handleAddWorkExperience}
        disabled={workExperienceDetails.length >= 3}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
      >
        Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperience;
