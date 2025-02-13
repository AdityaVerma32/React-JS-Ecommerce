import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { authorizedFetch } from '../Utils/authorizedFetch';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SuccessMessage from '../Components/SuccessMessage';
import ErrorMessage from '../Components/ErrorMessage';
import { setSuccessMessage } from '../Redux/Slice/PopUpMessageSlice';

function UserDetails() {
    const [user, setUser] = useState({});
    const [editedUser, setEditedUser] = useState({});

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const saveDetails = async () => {
        try {
            setLoading(true);
            if (user == editedUser) {
                console.log("No changes made to user data");
            } else {
                const response = await authorizedFetch(`/user/update/${id}`, "PUT", editedUser, dispatch);
                if (response.status === 200) {
                    setUser(editedUser);
                    dispatch(setSuccessMessage("User details updated successfully"));
                    setIsEditing(false);
                }
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await authorizedFetch(`/user/${id}`, "GET", null, dispatch);
                if (response.status === 200) {
                    setUser(response.data.data);
                    setEditedUser(response.data.data);
                }
                console.log(response);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };

        fetchUser();
    }, [id, dispatch]); // Add dependencies if necessary


    return (
        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto p-32 space-x-6 h-72">
            {loading && <Loader />}
            <SuccessMessage />
            <ErrorMessage />
            {/* Profile SVG */}
            <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </div>

            {/* User Details */}
            <div className="flex-grow space-y-4 relative">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold mb-6">Profile</h1>
                    <button
                        className="absolute top-0 right-0 text-blue-600 hover:underline"
                        onClick={() => {
                            setEditedUser(user)
                            setIsEditing(true)
                        }}>
                        Edit
                    </button>
                    <div className="flex items-center justify-between text-gray-700">
                        <span className="font-semibold">First Name:</span>
                        <span>{user.firstName}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                        <span className="font-semibold">Last Name:</span>
                        <span>{user.lastName}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                        <span className="font-semibold">Email:</span>
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Details</h2>

                        <label className="block text-gray-700 font-medium mb-1">First Name</label>
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedUser.firstName}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, firstName: e.target.value })
                            }
                            placeholder="First Name"
                        />

                        <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedUser.lastName}
                            onChange={(e) =>
                                setEditedUser({ ...editedUser, lastName: e.target.value })
                            }
                            placeholder="Last Name"
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={saveDetails}>
                                Save
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default UserDetails;
