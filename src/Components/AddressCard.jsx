import React, {useState} from "react";



function AddressCard({ address, isSelected, onSelect, onEdit,onDelete }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    const handleSave = () => {
        onEdit(editedAddress); // Save the updated address
        setIsEditing(false); // Close the popup
    };
    const complete_address = `${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.postalCode}`;

    return (
        <div
            className={`border p-4 rounded-lg mb-4 cursor-pointer relative ${isSelected ? "border-blue-500" : "border-gray-300"
                }`}
            onClick={() => onSelect(isSelected ? null : address.id)} // Toggle selection
        >
            <button
                className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onSelect function
                    setIsEditing(true); // Open the popup
                }}
            >
                Edit Address
            </button>
            <div className="pr-28"> {/* Add padding to ensure text doesn't overlap the button */}
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-700">{complete_address}</p>
                <p className="text-gray-600">{address.phoneNo}</p>
            </div>
            {isSelected && (
                <p className="text-blue-500 mt-2 font-semibold">Selected</p>
            )}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.street}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, street: e.target.value })
                            }
                            placeholder="Street"
                        />
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.city}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, city: e.target.value })
                            }
                            placeholder="City"
                        />
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.state}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, state: e.target.value })
                            }
                            placeholder="State"
                        />
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.country}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, country: e.target.value })
                            }
                            placeholder="Country"
                        />
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.postalCode}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, postalCode: e.target.value })
                            }
                            placeholder="Postal Code"
                        />
                        <input
                            className="border p-2 w-full rounded mb-2"
                            value={editedAddress.phoneNo}
                            onChange={(e) =>
                                setEditedAddress({ ...editedAddress, phoneNo: e.target.value })
                            }
                            placeholder="Phone Number"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleSave}
                            >
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
            <button
                className="absolute bottom-4 right-4 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onSelect function
                    onDelete(address.id);
                }}
            >
                🗑
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 -top-8 -right-2">
                    Delete
                </span>
            </button>
        </div>
    );
}

export default AddressCard;
